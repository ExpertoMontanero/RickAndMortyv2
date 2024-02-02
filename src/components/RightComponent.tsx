import "../styles/rightComponent.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

export default function RightComponent() {
  const GET_EPISODES = gql`
    query GetEpisodes {
      episodes(filter: { episode: "S04" }) {
        results {
          episode
          name
          air_date
          id
        }
      }
    }
  `;

  function DisplayEpisodes() {
    const [selectedEpisodeId, setSelectedEpisodeId] = useState<
      string | number | null
    >(null);
    const getEpisodeId = (id: string | number) => {
      selectedEpisodeId;
      setSelectedEpisodeId(id);
    };

    const { loading, error, data } = useQuery(GET_EPISODES);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    interface EpisodeData {
      episode: string;
      name: string;
      air_date: string;
      id: number;
    }
    return data.episodes.results.map(
      ({ episode, name, air_date, id }: EpisodeData) => (
        <Link
          to={`/EpisodeDetails/${id}`}
          onClick={() => getEpisodeId(id)}
          key={id}
          className="episode-box"
        >
          <div>
            <h2 className="episode-name">{episode}</h2>
          </div>
          <div className="vl"></div>
          <div className="title-air-box">
            <h1
              className="episod-title"
              style={id % 2 == 0 ? { color: "#00BDD4" } : { color: "#BDD800" }}
            >
              {name}
            </h1>
            <h3 className="air-date">{air_date}</h3>
            <hr className="horizontal-line" />
          </div>
        </Link>
      )
    );
  }
  return <DisplayEpisodes />;
}
