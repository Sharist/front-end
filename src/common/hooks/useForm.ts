import { FieldValues, useForm as useHookForm, UseFormOptions } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

/**
 * An adaptor on the `useForm` hook from `react-hook-form` (just to make code cleaner).
 *
 * @param validatorSchema Schema that complies to Joi validation schema.
 * @param config
 */
export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
>(
  validatorSchema: Joi.SchemaMap,
  config?: Exclude<UseFormOptions<TFieldValues, TContext>, 'resolver'>
) {
  const hookFormConfig: UseFormOptions<TFieldValues, TContext> = {
    resolver: joiResolver(Joi.object(validatorSchema)),
    ...config,
  };

  return useHookForm<TFieldValues, TContext>(hookFormConfig);
}
