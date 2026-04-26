import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import "./App.css";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const remainingCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  );

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTodo = newTodo.trim();
    if (!trimmedTodo) return;

    setTodos((currentTodos) => [
      { id: Date.now(), text: trimmedTodo, completed: false },
      ...currentTodos,
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const removeTodo = (id: number) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  const startEditTodo = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const saveEditTodo = (id: number) => {
    const trimmedText = editingText.trim();
    if (!trimmedText) return;

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, text: trimmedText } : todo,
      ),
    );
    setEditingId(null);
    setEditingText("");
  };

  const cancelEditTodo = () => {
    setEditingId(null);
    setEditingText("");
  };

  return (
    <main className="todo-app">
      <header className="todo-header">
        <h1>Todo List</h1>
        <p>{remainingCount} งานที่ยังไม่เสร็จ</p>
      </header>

      <form className="todo-form" onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="เพิ่มงานที่ต้องทำ..."
          aria-label="เพิ่มงานที่ต้องทำ"
        />
        <button type="submit">เพิ่ม</button>
      </form>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <li className="todo-empty">ยังไม่มีรายการ เริ่มเพิ่มงานแรกได้เลย</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              {editingId === todo.id ? (
                <div className="todo-edit">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(event) => setEditingText(event.target.value)}
                    aria-label={`แก้ไขงาน ${todo.text}`}
                  />
                  <button type="button" onClick={() => saveEditTodo(todo.id)}>
                    บันทึก
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={cancelEditTodo}
                  >
                    ยกเลิก
                  </button>
                </div>
              ) : (
                <>
                  <label className="todo-check">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <span className={todo.completed ? "completed" : ""}>
                      {todo.text}
                    </span>
                  </label>
                  <div className="todo-actions">
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => startEditTodo(todo)}
                    >
                      แก้ไข
                    </button>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => removeTodo(todo.id)}
                      aria-label={`ลบงาน ${todo.text}`}
                    >
                      ลบ
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </main>
  );
}

export default App;
