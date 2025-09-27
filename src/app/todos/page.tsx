"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { useSession } from "~/lib/auth-client";

export default function TodosPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");

  const { data: todos, refetch } = api.todo.getAll.useQuery(undefined, {
    enabled: !!session,
  });

  const createTodo = api.todo.create.useMutation({
    onSuccess: () => {
      setNewTodoTitle("");
      setNewTodoDescription("");
      void refetch();
    },
  });

  const toggleTodo = api.todo.toggle.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const deleteTodo = api.todo.delete.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  if (!session) {
    router.push("/auth");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
      createTodo.mutate({
        title: newTodoTitle,
        description: newTodoDescription || undefined,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">My Todos</h1>
          <button
            onClick={() => router.push("/")}
            className="rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/20 transition"
          >
            Back to Home
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-8 rounded-xl bg-white/10 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">Add New Todo</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
            <textarea
              placeholder="Description (optional)"
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              rows={3}
            />
            <button
              type="submit"
              disabled={createTodo.isPending || !newTodoTitle.trim()}
              className="rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white hover:bg-purple-700 disabled:opacity-50 transition"
            >
              {createTodo.isPending ? "Adding..." : "Add Todo"}
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {todos?.length === 0 && (
            <p className="text-center text-gray-400">No todos yet. Create your first one!</p>
          )}
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className="flex items-start gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/15 transition"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  toggleTodo.mutate({ id: todo.id, completed: !todo.completed })
                }
                className="mt-1 h-5 w-5 rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-purple-500"
              />
              <div className="flex-1">
                <h3
                  className={`text-lg font-medium text-white ${
                    todo.completed ? "line-through opacity-60" : ""
                  }`}
                >
                  {todo.title}
                </h3>
                {todo.description && (
                  <p
                    className={`mt-1 text-gray-300 ${
                      todo.completed ? "line-through opacity-60" : ""
                    }`}
                  >
                    {todo.description}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-400">
                  Created: {new Date(todo.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => deleteTodo.mutate({ id: todo.id })}
                className="rounded-lg bg-red-600/20 px-3 py-1 text-red-400 hover:bg-red-600/30 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}