import { useQuery } from "react-query";
import { fetchData } from "./api";

// export const useGetTodos = (resultCount) => {
//   console.log(resultCount);
//   const url = `https://randomuser.me/api/?results=${resultCount}`;
//   return useQuery(
//     "todos",
//     () => {
//       console.info("server request sent.");
//       return fetchData.get(url);
//     },
//     { refetchOnWindowFocus: false }
//   );
// };
export const useGetTodos = (resultCount) => {
  const url = `https://randomuser.me/api/?results=${resultCount}`;

  const { data, refetch } = useQuery(
    "todos",
    () => {
      console.info("server request sent.");
      return fetchData.get(url);
    },
    { refetchOnWindowFocus: false,enabled :!!resultCount}
  );

  return { data, refetch };
};
