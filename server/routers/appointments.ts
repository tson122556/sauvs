import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { createAppointment, getAppointments } from "../db";

export const appointmentsRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        phone: z.string().min(1, "Phone is required"),
        consultationType: z.enum(["ai", "robot", "iot"]),
        preferredDate: z.string().min(1, "Date is required"),
        preferredTime: z.string().default("09:00"),
        message: z.string().optional().default(""),
      })
    )
    .mutation(async ({ input }) => {
      await createAppointment({
        name: input.name,
        email: input.email,
        phone: input.phone,
        consultationType: input.consultationType,
        preferredDate: input.preferredDate,
        preferredTime: input.preferredTime,
        message: input.message,
        status: "pending",
        createdAt: new Date(),
      });

      return {
        success: true,
      };
    }),

  list: publicProcedure.query(async () => {
    return await getAppointments();
  }),
});
