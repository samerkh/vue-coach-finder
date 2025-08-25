<template>
  <Form
    @submit="submitMessage"
    :validation-schema="schema"
    :initial-values="initialValues"
  >
    <div class="form-control">
      <label for="email">Email</label>
      <Field id="email" name="email" type="email" validate-on-input />
      <ErrorMessage name="email" class="errors" />
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <Field
        as="textarea"
        id="message"
        rows="5"
        name="message"
        type="text"
        validate-on-input
      />
      <ErrorMessage name="message" class="errors" />
    </div>
    <div class="actions">
      <base-button>Send message</base-button>
    </div>
  </Form>
</template>

<script>
import { toTypedSchema } from '@vee-validate/zod';
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as z from 'zod';
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: ['id'],
  data() {
    const schema = z.object({
      email: z.string().email('Please enter a valid email'),
      message: z
        .string()
        .min(10, 'Message should contain at least 10 characters'),
    });

    return {
      schema: toTypedSchema(schema),
      initialValues: {
        email: '',
        message: '',
      },
    };
  },
  methods: {
    submitMessage(values) {
      const req = {
        ...values,
        coachId: this.id,
      };
      this.$store.dispatch('requests/contactCoach', req);
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
