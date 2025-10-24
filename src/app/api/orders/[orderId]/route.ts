import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import prisma  from "@/lib/prisma";

// Helper function to get user from token
async function getUserFromToken(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return null;
    }

    const payload = await verifyToken(token);
    return {
      id: payload.id as string,
      email: payload.email as string,
    };
  } catch (error) {
    return null;
  }
}

// GET /api/orders/[orderId] - Get specific order
export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const order = await prisma.order.findFirst({
      where: {
        id: params.orderId,
        userId: user.id, // Ensure user can only access their own orders
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/orders/[orderId] - Update order status (admin only for now)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await request.json();

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    // For now, allow users to cancel their own orders
    // In production, you'd want admin-only status updates
    const order = await prisma.order.findFirst({
      where: {
        id: params.orderId,
        userId: user.id,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Only allow cancellation for pending orders
    if (status === "CANCELLED" && order.status === "PENDING") {
      const updatedOrder = await prisma.order.update({
        where: { id: params.orderId },
        data: { status },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
      return NextResponse.json(updatedOrder);
    }

    return NextResponse.json({ error: "Invalid status update" }, { status: 400 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
