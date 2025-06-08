fetch("/api/auth/signin", {
  method: "POST",
  body: JSON.stringify({ email, password }),
});

// Alternative:
fetch("/api/auth", {
  method: "POST",
  body: JSON.stringify({ action: "signin", email, password }),
});
