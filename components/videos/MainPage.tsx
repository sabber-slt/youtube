import { homeVideos } from "@/hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

type Props = {};

const MainPage = (props: Props) => {
  const [hybrid, setHybrid] = useState<any>(false);
  const [videos, setVideos] = useState<any>([]);

  useEffect(() => {
    setHybrid(true);
  }, []);
  const { data, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: homeVideos,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  return <div>MainPage</div>;
};

export default MainPage;
