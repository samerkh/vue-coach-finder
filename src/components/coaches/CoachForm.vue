<template>
  <Form @submit="submitForm" :validation-schema="validationSchema">
    <div class="form-control">
      <label for="firstName">First Name</label>
      <Field
        name="firstName"
        type="text"
        id="firstName"
        v-model.trim="formValues.firstName"
      />
      <ErrorMessage name="firstName" />
    </div>
    <div class="form-control">
      <label for="lastName">Last Name</label>
      <Field
        name="lastName"
        type="text"
        id="lastName"
        v-model.trim="formValues.lastName"
      />
      <ErrorMessage name="lastName" />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <Field
        as="textarea"
        name="description"
        id="description"
        rows="3"
        v-model.trim="formValues.description"
      ></Field>
      <ErrorMessage name="description" />
    </div>
    <div class="form-control">
      <label for="hourlyRate">Hourly Rate</label>
      <Field
        name="hourlyRate"
        type="number"
        id="hourlyRate"
        v-model="formValues.hourlyRate"
      />
      <ErrorMessage name="hourlyRate" />
    </div>
    <div class="form-control">
      <h3>Areas of Expertise</h3>
      <div>
        <Field
          name="areas"
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="formValues.areas"
        />
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <Field
          name="areas"
          type="checkbox"
          id="backend"
          value="backend"
          v-model="formValues.areas"
        />
        <label for="backend">Backend</label>
      </div>
      <div>
        <Field
          name="areas"
          type="checkbox"
          id="career"
          value="career"
          v-model="formValues.areas"
        />
        <label for="career">Career</label>
      </div>
      <ErrorMessage name="areas" />
    </div>
    <base-button>Register</base-button>
  </Form>
</template>

<script>
import { toTypedSchema } from '@vee-validate/zod';
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as z from 'zod';

const schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters long'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long'),
  hourlyRate: z.number().min(1, 'Hourly rate must be greater than zero'),
  areas: z
    .array(z.enum(['frontend', 'backend', 'career']))
    .min(1, 'Select at least one area of expertise'),
});

export default {
  emits: ['submit-data'],
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    return {
      formValues: {
        firstName: '',
        lastName: '',
        description: '',
        hourlyRate: null,
        areas: [],
      },
      validationSchema: toTypedSchema(schema),
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

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
