import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const LOCAL_STORAGE_KEY = "lastName";

const NameInput = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("");
  const [greeting, setGreeting] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setName(saved);
  }, []);

  const validateEmail = (value: string) => {
    if (!value) return true; // optional field
    return value.includes("@") && value.includes(".");
  };

  const handleSubmit = () => {
    setError("");
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name");
      return;
    }
    if (trimmed.length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }
    if (!validateEmail(email.trim())) {
      setError("Please enter a valid email (must include @ and .) or leave empty");
      return;
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, trimmed);
    setGreeting(`Hello, ${trimmed}! Welcome to data analysis!${favoriteColor ? ` Your favorite color: ${favoriteColor}.` : ""}`);
  };

  const handleClear = () => {
    setName("");
    setEmail("");
    setFavoriteColor("");
    setGreeting("");
    setError("");
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Akwasi's Hub</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
          <p className="text-xs text-gray-500 mt-1">Characters: {name.length}</p>
        </div>

        <Input
          placeholder="Enter your email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />

        <div>
          <label className="text-sm">Favorite color (optional)</label>
          <select
            value={favoriteColor}
            onChange={(e) => setFavoriteColor(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          >
            <option value="">Select a color</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Red">Red</option>
            <option value="Yellow">Yellow</option>
          </select>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSubmit} className="flex-1">
            Say Hello
          </Button>
          <Button onClick={handleClear} className="flex-1 bg-gray-200 text-black hover:bg-gray-300">
            Clear
          </Button>
        </div>

        {error && <p className="text-center text-red-600 text-sm">{error}</p>}
        {greeting && <p className="text-center text-green-600 font-medium">{greeting}</p>}
      </CardContent>
    </Card>
  );
};

export default NameInput;
