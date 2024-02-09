// export interface IWatchListCardProps {
//   id: number;
//   image: string;
//   name: string;
//   organisationName?: string;
//   industry?: string;
//   location: string;
//   type: "executive" | "organisation";
//   title?: string;
//   selectWatchList: (id: number) => void;
//   deSelectWatchList: (id: number) => void;
//   selectedEntries: number[];
// }
export type WatchListFilter = "all" | "organisation" | "executive";
export type IWatchListCardProps = {
  id: string;
  image?: string;
  name?: string;
  organisationName?: string;
  executiveName?: string;
  industry?: string;
  location: string;
  type: "executive" | "organisation" | string;
  title?: string;
};
