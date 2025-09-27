import { z } from "zod";
import { eq, and } from "drizzle-orm";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { todos } from "~/server/db/schema/todos";

export const todoRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      description: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(todos).values({
        title: input.title,
        description: input.description,
        userId: ctx.session.user.id,
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {

      const data = await ctx.db.select().from(todos).where(eq(todos.userId, ctx.session.user.id));

      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }),

  toggle: protectedProcedure
    .input(z.object({
      id: z.string(),
      completed: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(todos)
        .set({ completed: input.completed })
        .where(
          and(
            eq(todos.id, input.id),
            eq(todos.userId, ctx.session.user.id)
          )
        );
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(todos)
        .where(
          and(
            eq(todos.id, input.id),
            eq(todos.userId, ctx.session.user.id)
          )
        );
    }),
});