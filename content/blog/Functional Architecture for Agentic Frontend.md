---
title: "Why Functional Architecture Makes AI Agents Actually Work (Lessons from a 20-Hour Flight)"
description: How designing frontends with functional architecture transforms agent-generated code from spaghetti to composable, testable systems.
priority: 6
---

I had the worst week of agentic coding in my life, followed immediately by the best.

The task was building a complex frontend. React, TypeScript, the usual stack. I had been using agents successfully on backend code for months. Java, Python, clean service layers. The agents would pump out well-tested functions that slotted into my architecture like lego blocks.

Then I tried the same approach on frontend code and got tangled spaghetti, tests that tested nothing, and state management that made me want to cry. Components with implicit dependencies. Hooks calling hooks calling hooks. The agents were confidently producing garbage that looked correct until you tried to change anything.

This was supposed to work. The models were good enough. I had seen them nail backend tasks. So what was different about frontend?

I had a 20-hour flight from Sydney to Tokyo to think about it. That flight changed how I build software with agents.

## The Realization

The backend code that worked well with agents had three properties:

1. **Everything was a function.** Services took inputs, returned outputs. No hidden state mutations.
2. **Types constrained the space.** The signature `processOrder(order: Order): Result<Receipt, OrderError>` tells you almost everything you need to know.
3. **Impurity was pushed to the edges.** Database calls, API requests, logging - all at the boundaries. The core was pure logic.

My frontend code had none of these. Components rendered based on five different sources of state. Effects triggered other effects. The "type" of a component was whatever React felt like passing it that day.

The agents were not failing because they were bad at frontend. They were failing because my frontend architecture gave them nothing to hold onto. No clear function signatures. No explicit data flow. No way to verify correctness except running the whole app and squinting.

## Three Books That Changed Everything

On that flight I re-read parts of three books that suddenly made sense together:

**Software Design for Flexibility** by Hanson and Sussman (MIT). The core idea: build systems from "combinators" - functions with consistent interfaces that compose to make new functions with the same interface. If `f: A -> B` and `g: B -> C`, then `compose(g, f): A -> C`. The composition has the same shape as the parts.

**Functional Design and Architecture** by Alexander Granin. Shows how to build large systems in Haskell using layers of abstraction. The key insight: the domain model is separate from the infrastructure. Your business logic does not know about HTTP or databases.

**Category Theory for the Sciences** by Spivak. Not a programming book, but it crystallized something: composition is about preserving structure. When you compose functions correctly, you do not lose information about what they do.

The common thread: **good architecture is about making composition reliable.**

## Why This Matters for Agents

LLMs are pattern matchers. They complete patterns they have seen in training data. When you give an agent a codebase, the patterns it can match depend entirely on how your code is structured.

A function like this:

```typescript
const calculateDiscount = (
  items: CartItem[],
  coupon: Coupon | null
): DiscountResult => { ... }
```

Has a clear pattern. Input types, output type, pure function. The agent has seen thousands of variations on this pattern. It can produce implementations, tests, variations.

A component like this:

```typescript
const CheckoutFlow = () => {
  const { user } = useAuth();
  const { cart, updateCart } = useCart();
  const { applyCoupon } = useCoupons();
  // ... 50 lines of implicit dependencies
}
```

Has no clear pattern. The "signature" is hidden in hook calls. The data flow is invisible. The agent cannot see what this component needs or produces. It pattern-matches on surface syntax and produces something that compiles but breaks in ways you will only discover at runtime.

## The Fix: Functional Frontend Architecture

After that flight, I rebuilt my frontend approach around three rules:

**Rule 1: Domain logic is pure functions.**

All business logic lives in pure functions that take typed inputs and return typed outputs. No React, no hooks, no state. Just functions.

```typescript
// Domain layer - pure functions
const applyDiscount = (cart: Cart, discount: Discount): Cart => ...
const validateCheckout = (cart: Cart, user: User): ValidationResult => ...
const calculateTotals = (cart: Cart): CartTotals => ...
```

Agents excel at producing these. The pattern is clear. Tests are obvious. Composition just works.

**Rule 2: Components are just views.**

React components render data. They do not compute data. They call pure functions and display results.

```typescript
const CartSummary = ({ cart, onUpdate }: CartSummaryProps) => {
  const totals = calculateTotals(cart);
  return <div>...</div>;
};
```

The component signature tells you exactly what it needs. No hidden dependencies. The agent can generate variations without understanding the whole app.

**Rule 3: State is explicit and centralized.**

Effects and state live in a few clearly defined places. The rest of the app is pure functions reacting to that state.

This is not a new architecture. It is functional reactive programming, applied consistently. What is new is realizing that this architecture is not just "cleaner" - it is *necessary* for agents to work reliably.

## Connection to Context Engineering

This brings me back to [[blog/90-percent-token-reduction|context engineering]]. The problem with large codebases is not just token count. It is that agents cannot identify the relevant patterns in a sea of implicit dependencies.

Functional architecture solves this two ways:

1. **Each function is self-documenting.** The signature tells you the contract. The implementation is the only thing that matters. Agents need less context because each piece contains its own context.

2. **Composition preserves meaning.** When you compose pure functions, the meaning of the composition is determined by the meanings of the parts. No spooky action at a distance. Agents can work on one function without understanding the whole system.

This is Sussman's insight about combinators: "Any combination yields a legal program, whose behavior transparently depends only on the behaviors of the parts and the ways that they are combined."

When your codebase has this property, agents can work locally with confidence that their changes compose globally.

## Practical Takeaways

1. **Push impurity to the edges.** API calls, state management, effects - all at the boundaries. Core logic is pure functions.

2. **Type everything explicitly.** Types are free documentation that agents can read. `Result<T, E>` is better than throwing exceptions. Union types beat boolean flags.

3. **Prefer functions over classes.** A function is a single pattern. A class is many patterns bundled together with hidden relationships.

4. **Test the domain layer.** If your pure functions are correct, your components just need to wire them up correctly. Agents can generate domain tests trivially.

5. **Make data flow visible.** Props down, callbacks up. No global state. No context abuse. If you cannot draw the data flow, agents cannot infer it.

The agents did not get smarter. My architecture got more composable. That was the lesson from the Sydney-Tokyo flight, and it is the most productive change I have made to how I work with AI.

---

*Related: [[blog/LLMs as Pattern Mappers|LLMs as Pattern Mappers]] - the mental model behind why this works.*
