export type ReservationStatus = "confirmed" | "cancelled";

export type OrderStatus =
  | "pending"
  | "awaiting_payment"
  | "paid"
  | "cancelled"
  | "failed";

export type Database = {
  public: {
    Tables: {
      reservations: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          date: string;
          time: string;
          guests: number;
          notes: string | null;
          status: ReservationStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          date: string;
          time: string;
          guests: number;
          notes?: string | null;
          status?: ReservationStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          date?: string;
          time?: string;
          guests?: number;
          notes?: string | null;
          status?: ReservationStatus;
          created_at?: string;
        };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          order_code: number;
          customer_name: string;
          customer_email: string;
          customer_phone: string | null;
          amount: number;
          currency: string;
          status: OrderStatus;
          payos_payment_link_id: string | null;
          payos_checkout_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_code: number;
          customer_name: string;
          customer_email: string;
          customer_phone?: string | null;
          amount: number;
          currency?: string;
          status?: OrderStatus;
          payos_payment_link_id?: string | null;
          payos_checkout_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_code?: number;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string | null;
          amount?: number;
          currency?: string;
          status?: OrderStatus;
          payos_payment_link_id?: string | null;
          payos_checkout_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          unit_price: number;
          quantity: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          unit_price: number;
          quantity: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          product_name?: string;
          unit_price?: number;
          quantity?: number;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      reservation_status: ReservationStatus;
      order_status: OrderStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
