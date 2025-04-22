// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      user: {
        id: number;
        role: 'Startup' | 'Mentor' | 'Manager' | 'Manager as Mentor';
        email: string;
        firstName: string | null;
        lastName: string | null;
      };
    }
    // interface Error {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
