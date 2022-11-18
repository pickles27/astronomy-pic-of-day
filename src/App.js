import "./styles.css";
import { useEffect, useState } from "react";
import moment from "moment";

export default function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [dateText, setDateText] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      await fetch("https://go-apod.herokuapp.com/apod")
        .then((res) => res.json())
        .then((res) => {
          setData(res);
          const formattedDate = moment(res.date).format("dddd, MMMM Do, YYYY");
          setDateText(formattedDate);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    void loadData();
  }, []);

  if (loading || !data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      <h1>Astronomy Picture of the Day</h1>
      <img className="imageOfDay" src={data.url} alt="astronomy pic of day" />
      <div className="info">
        <h2>{data.title}</h2>
        <p>
          {dateText} · {data.copyright}
        </p>
        <p>{data.explanation}</p>
        <a href={data.hdurl} target="_blank" rel="noreferrer">
          View HD Image
        </a>
      </div>
    </div>
  );
}
