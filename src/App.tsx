import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { useEffect } from 'react';

export const DataSchema = 
  z.object({
    name: 
      z.string()
      .min(3, {message: 'Too short'})
      .max(20, {message: 'Too long'}),
    email: 
      z.string()
      .email(),
    password: 
      z.string()
      .min(8, {message: 'Too short'})
      .max(20, {message: 'Too long'})
  });

type FormInput = z.infer<typeof DataSchema>

function App(): JSX.Element {
  
  const {
    register, 
    reset,
    handleSubmit, 
    watch, 
    trigger,
    setError, 
    formState: { 
      errors, 
      isDirty,
      isValid,
      isSubmitting, 
      isSubmitSuccessful, 
      submitCount 
    }
  } = useForm<FormInput>({defaultValues: {
            email: 'test@email.com',
          },
          mode: 'onTouched',
          resolver: zodResolver(DataSchema)
      });

  useEffect(() => {
    if(isSubmitSuccessful) {
      alert('Submission Successful');
    }
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<FormInput> = async (data: FieldValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      console.log(data)
      reset()
    } catch (error) {
      setError('root'/*| 'email' | 'name' | 'password'*/, {
        message: 'Submit failed'
      })
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors['root'] 
        ? 
        <span role='alert'>{errors.root.message}</span> 
        : 
        undefined
      }
      <br />
      <label 
        htmlFor='name'
      >
        {submitCount > 3
          ?
          'Too many tries'
          :
          isSubmitting 
          ?
          'Loading...'
          :
          watch('name') || watch('name')?.length
          ?
          watch('name') 
          : 
          'Name'
        }
      </label>
      <br />
      <input 
        id='name' 
        type='text' 
        {...register('name',
          {
            required: 'Name is required 🐙', 
            disabled: isSubmitting || submitCount > 3,
            minLength: {
              value: 3,
              message: 'Name must be 3 characters or more 🐙'
            }, 
            maxLength: {
              value: 20,
              message: 'Name must be less than 20 characters 🐙'
            }, 
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'Name must be only letters 🐙'
            }
          })
        } 
      />
      <br />
      {errors['name'] 
        ? 
        <span role='alert'>{errors.name.message}</span> 
        : 
        undefined
      }
      <br />
      <label 
        htmlFor='email'
      >
        {submitCount > 3
          ?
          'Too many tries'
          :
          isSubmitting
          ?
          'Loading...'
          :
          watch('email') || watch('email')?.length
          ? 
          watch('email') 
          : 
          'Email'
        }
      </label>
      <br />
      <input 
        id='email' 
        type='email' 
        {...register('email',
          {required: 'Email is required 🦁',
            disabled: isSubmitting || submitCount > 3, 
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Not an email 🦁'
            }
          })
        }
      />
      <br />
      {errors['email'] 
        ? 
        <span role='alert'>{errors.email.message}</span> 
        : 
        undefined
      }
      <br />
      <label 
        htmlFor='password'
      >
        {submitCount > 3
          ?
          'Too many tries'
          :
          isSubmitting 
          ?
          'Loading...'
          :
          watch('password') || watch('password')?.length 
          ? 
          watch('password') 
          : 
          'Password'
        }
      </label>
      <br />
      <input 
        id='password' 
        type='password'
        {...register('password',
          {required: 'Password is required 👾', 
            disabled: isSubmitting || submitCount > 3 || !isDirty,
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters 👾'
            },
            maxLength: {
              value: 20,
              message: 'Password must be under 20 characters 👾'
            },
          })
        } 
      />
      <br />
      {errors['password'] 
        ? 
        <span role='alert'>{errors.password.message}</span> 
        : 
        undefined
      }
      <br />
      <button 
        disabled={isSubmitting || submitCount > 3 || !isValid} 
        type='submit'
      >
        {isSubmitting ? 'Loading...' : 'Submit'}
      </button>
      <br />
      <button 
        disabled={isSubmitting || submitCount > 3}
        type='button' 
        onClick={() => trigger('name')}
      >
        Validate
      </button>
    </form>
  )
}

export default App;