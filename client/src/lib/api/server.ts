import axios from "axios";
interface Body<TVariables> {
  query: string;
  variables?: TVariables;
}
interface Error {
  message: string;
}
export const server = {
  fetch: async <TData = any, TVariables = any>(body: Body<TVariables>) => {
    try {
      const res = await axios({
        url: "http://localhost:9000/api",
        method: "post",
        data: body,
      });
      return res.data as Promise<{ data: TData; errors: Error[] }>;
    } catch (error) {
      throw new Error("Failed to fetch");
    }
  },
};
