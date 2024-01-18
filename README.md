## React Hook Form Set Up

<img src="https://plus.unsplash.com/premium_photo-1671730787227-075edb27428c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hook-Form" width="350" />

### Setup

`pnpm i react-hook-form`
`pnpm i zod`
`pnpm i @hookform/resolvers`

***

### Extras

_confirm-password_

`.refine` for zod safety

```JavaScript
    z.object({})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  })
```