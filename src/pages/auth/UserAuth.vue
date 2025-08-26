<template>
  <div>
    <base-dialog :show="!!error" :title="error?.name" @close="handleError">
      <p>
        {{ error?.message ?? '' }}:
        {{ error?.response?.data?.error?.message ?? 'unkown error' }}
      </p>
    </base-dialog>
    <base-dialog fixed :show="isLoading" title="Authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <Form
        :validation-schema="schema"
        :initial-values="initialValues"
        @submit="submitForm"
      >
        <div class="form-control">
          <label for="email">Email</label>
          <Field id="email" name="email" type="email" validate-on-input />
          <ErrorMessage name="email" class="error" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <Field
            id="password"
            name="password"
            type="password"
            validate-on-input
          />
          <ErrorMessage name="password" class="error" />
        </div>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="toggleMode">
          {{ switchButtonCaption }}
        </base-button>
      </Form>
    </base-card>
  </div>
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
  props: ['mode'],
  data() {
    const schema = z.object({
      email: z
        .string({ message: 'please enter your email' })
        .min(1, 'please enter your email'),
      password: z
        .string({ message: 'please enter your password' })
        .min(6, 'please enter a password with minimum 6 characters'),
    });

    return {
      schema: toTypedSchema(schema),
      initialValues: { email: null, password: null },
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode == 'login' ? 'Login' : 'SignUp';
    },
    switchButtonCaption() {
      return this.mode == 'login' ? 'SignUp' : 'Login';
    },
  },
  methods: {
    async submitForm(data) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('auth', { action: this.mode, data });
      } catch (e) {
        this.error = e;
      }
      this.isLoading = false;
    },
    toggleMode() {
      if (this.mode == 'login') {
        this.$router.replace('/auth/signup');
      } else {
        this.$router.replace('/auth/login');
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
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

.error {
  color: red;
  font-size: large;
  font-weight: bold;
}
</style>
