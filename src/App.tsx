import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {z, ZodType} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'

interface FormInput {
  name: string,
  email: string,
  password: string
}

export const DataSchema: ZodType<FormInput> = 
  z.object({
    name: z.string().min(3, {message: 'Too short'}).max(20, {message: 'Too long'}),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Too short'}).max(20, {message: 'Too long'})
  })

function App(): JSX.Element {
  
  const {register, reset, handleSubmit, watch, formState: {errors}} = useForm<FormInput>({resolver: zodResolver(DataSchema)})
  const onSubmit: SubmitHandler<FormInput> = (data: FieldValues) => {
    console.log(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='name'>{watch('name') || watch('name')?.length ? watch('name') : 'Name'}</label>
      <br />
      <input 
        id='name' 
        type='text' 
        {...register('name',
          {
            required: true, 
            minLength: 3, 
            maxLength: 20, 
            pattern: /^[A-Za-z]+$/i
          })
        } 
      />
      <br />
      {errors['name'] ? <span role="alert">Name Invalid</span> : undefined}
      <br />
      <label htmlFor='email'>{watch('email') || watch('email')?.length ? watch('email') : 'Email'}</label>
      <br />
      <input 
        id='email' 
        type='email' 
        {...register('email',
          {
            required: true, 
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Is not an email"
            }
          })
        } 
      />
      <br />
      {errors['email'] ? <span role="alert">Email Invalid</span> : undefined}
      <br />
      <label htmlFor='password'>{watch('password') || watch('password')?.length ? watch('password') : 'Password'}</label>
      <br />
      <input 
        id='password' 
        type='password' 
        {...register('password',
          {
            required: true, 
            minLength: {
              value: 5,
              message: 'min length is 5'
            }
          })
        } 
      />
      <br />
      {errors['password'] ? <span role="alert">Password Invalid</span> : undefined}
      <br />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default App
