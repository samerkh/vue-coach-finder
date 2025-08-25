<template>
  <Form
    @submit="submitForm"
    :validation-schema="validationSchema"
    :initial-values="initialValues"
  >
    <div class="form-control">
      <label for="firstName">First Name</label>
      <Field id="firstName" name="firstName" type="text" validate-on-input />
      <ErrorMessage name="firstName" class="invalid" />
    </div>
    <div class="form-control">
      <label for="lastName">Last Name</label>
      <Field id="lastName" name="lastName" type="text" validate-on-input />
      <ErrorMessage name="lastName" class="invalid" />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <Field
        as="description"
        id="firstName"
        name="description"
        rows="3"
        validate-on-input
      />
      <ErrorMessage name="description" class="invalid" />
    </div>
    <div class="form-control">
      <label for="hourlyRate">Hourly Rate</label>
      <Field
        id="hourlyRate"
        name="hourlyRate"
        type="number"
        validate-on-input
      />
      <ErrorMessage name="hourlyRate" class="invalid" />
    </div>
    <div class="form-control">
      <h3>Areas of Expertise</h3>
      <div>
        <Field id="frontend" name="areas" type="checkbox" value="frontend" />
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <Field id="backend" name="areas" type="checkbox" value="backend" />
        <label for="backend">Backend</label>
      </div>
      <div>
        <Field id="career" name="areas" type="checkbox" value="career" />
        <label for="career">Career</label>
      </div>
      <ErrorMessage name="areas" class="invalid" />
    </div>
    <base-button>Register</base-button>
  </Form>
</template>

<script>
import { toTypedSchema } from '@vee-validate/zod';
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as z from 'zod';

export default {
  emits: ['submit-data'],
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    const schema = z.object({
      firstName: z
        .string({ required_error: 'First name is required' })
        .min(2, 'First name must be at least 2 characters long'),
      lastName: z
        .string()
        .min(2, 'Last name must be at least 2 characters long'),
      description: z
        .string()
        .min(10, 'Description must be at least 10 characters long'),
      hourlyRate: z
        .number({ message: 'Please enter a number' })
        .min(5, 'Hourly rate must be greater than 5'),
      areas: z
        .array(z.enum(['frontend', 'backend', 'career']))
        .min(1, 'Select at least one area of expertise'),
    });
    return {
      validationSchema: toTypedSchema(schema),
      initialValues: {
        firstName: '',
        lastName: '',
        description: '',
        hourlyRate: null,
        areas: [],
      },
    };
  },

  methods: {
    submitForm(values) {
      this.$emit('submit-data', values);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid,
.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
