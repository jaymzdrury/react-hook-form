## React Hook Form Set Up

<img src="https://plus.unsplash.com/premium_photo-1671730787227-075edb27428c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hook-Form" width="350" />

### Setup

`pnpm i react-hook-form`
`pnpm i zod`
`pnpm i @hookform/resolvers`

***

### Honorable Mentions

_confirm-password_ with _zod_

`.refine` for zod safety

```JavaScript
    z.object({...})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  })
```

### Notes

_required_ goes to _message_

```JavaScript
  {...register('email',
    {required: /*Insert Message Here*/}
  )}

  //Message is Displayed Here
  {errors.email.message}
```

_setError-root_ goes to _error-root_

```JavaScript
  //Error caught here
  setError('root', {
    message: 'Submit failed'
  })

  //is logged here
  {errors['root']...}
```

_mode_ determines when to trigger validation

```JavaScript
  mode: 'onBlur' //default is 'onSubmit'
```

_isDirty_ means user has interacted with form

```JavaScript
  //disable input, until user has "dirtied" the form
  <input type='email' disabled={!isDirty} />
```