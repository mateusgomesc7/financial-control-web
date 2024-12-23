import type { $Fetch } from "ofetch";

export default class BaseService {
  protected fetch: $Fetch;
  protected nuxtApp = useNuxtApp();

  constructor(fetch: $Fetch) {
    this.fetch = fetch;
  }

  protected async request<T>(
    url: string,
    method: string,
    body?: object | string,
    options?: object
  ): Promise<T | undefined> {
    try {
      return await this.fetch<T>(url, {
        method,
        ...(body && { body }),
        ...options,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // let message = this.nuxtApp.$i18n.t("api.connection_failed");
      // if (error.message) message = error.message;
      // if (error.data) message = error.data.message;
      // this.nuxtApp.callHook("app:error", { message, originalError: error });
      // throw error;
      console.error(error);
    }
  }
}
