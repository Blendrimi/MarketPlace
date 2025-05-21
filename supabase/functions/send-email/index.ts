import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  const body = await req.json();
  const { to, name } = body;

  try {
    const data = await resend.emails.send({
      from: "Blendrim <blendrimselmani@gmail.com>",
      to,
      subject: "Order Confirmation",
      html: `<strong>Hello ${name}, your order was received!</strong>`,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
