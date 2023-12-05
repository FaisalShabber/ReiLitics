import React, { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import BooksComponent from "../../Component/BooksComponent";
import PodcastsComponent from "../../Component/PodcastsComponent";
import BooksData from "../../Component/Data/BooksData";
import PodcastsData from "../../Component/Data/PodcastsData";
import DocumnetsData from "../../Component/Data/DocumentsData";
import DownloadsComponent from "../../Component/DownloadsComponent";
import GetData from "../../Api/GetData";
import NewSidebar from "../../Component/new.sidebar";
import NewNavbar from "../../Component/new.Navbar";
import TagManager from "react-gtm-module";
import { hotjar } from "react-hotjar";

export default function Resources() {
  const [booksvisible, setbooksvisible] = useState(5);
  const [podcastsvisible, setpodcastsvisible] = useState(5);
  const [data, setData] = useState([]);

  const [documenrtsvisible, setdocumenrtsvisible] = useState(6);
  const [state, setState] = useState({
    PodcastsData: PodcastsData,
    BooksData: BooksData,
    DocumnetsData: DocumnetsData,
  });
  const [allPodcasts, setAllPodcasts] = useState([]);

  useEffect(() => {
    TagManager.initialize({ gtmId: "G-H9MYM6Y0B3" });
    hotjar.initialize(3433366, 6);
  }, []);

  useEffect(() => {
    const response = GetData.Resource();
    const response2 = GetData.Podcast();
    response.then((value) => {
      if (value) {
        setData(value.data.resources);
      }
    });
    response2.then((value) => {
      if (value) {
        setAllPodcasts(value.data.podcasts);
      }
    });
  }, []);

  const RenderingBooks = data.slice(0, booksvisible).map((books, index) => {
    return (
      <BooksComponent
        key={index}
        Imgsrc={books.fileUrl}
        title={books.title}
        authur={books.authur}
        cost={books.cost}
        resourceUrl={books.resourceUrl}
        Book={"on Amazon"}
      />
    );
  });

  const RenderingPodcasts = allPodcasts
    .slice(0, podcastsvisible)
    .map((podcasts, index) => {
      return (
        <PodcastsComponent
          key={index}
          Imgsrc={podcasts.fileUrl}
          title={podcasts.title}
          authur={podcasts.authur}
          cost={podcasts.cost}
          resourceUrl={podcasts.podcastUrl}
          Book={"Podcast"}
        />
      );
    });
  const RenderingDownloads = DocumnetsData.slice(0, documenrtsvisible).map(
    (pdf, index) => {
      return (
        <DownloadsComponent
          key={index}
          Imgsrc={pdf.imgSrc}
          fileName={pdf.fileName}
        />
      );
    }
  );

  return (
    <>
      <Head>
        <title>Resources - REI Litics</title>
      </Head>

      <NewNavbar />
      <div
        className="d-inline-flex w-100"
        style={{ background: "#FAFBFF", padding: "18px 20px" }}
      >
        <NewSidebar />
        <div style={{ width: "inherit" }} className="overflow_class">
          <div className="container mx-auto mt-3 px-md-5 Table">
            <p className="fs-40 Gothic_3D fot-mon">Resources</p>
            <div className="bg-dash brdr p-4 my-3">
              <p className="fs-20">Books</p>
              <div
                className="my-4 g-4"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                {RenderingBooks}
              </div>
              <div className="text-center mt-5">
                {BooksData.length > 5 &&
                  (booksvisible < BooksData.length ? (
                    <button
                      className="bg_theme brdr text-white no_brdr"
                      onClick={() => setbooksvisible(booksvisible + 4)}
                      style={{ cursor: "pointer" }}
                    >
                      load More
                    </button>
                  ) : (
                    <button
                      className="bg_theme brdr text-white no_brdr"
                      onClick={() => setbooksvisible(booksvisible - 4)}
                      style={{ cursor: "pointer" }}
                    >
                      Show Less
                    </button>
                  ))}
              </div>
            </div>
            <div className="bg-dash brdr p-4 my-3">
              <p className="fs-20">Podcasts</p>
              <div
                className="my-4 g-4"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                {RenderingPodcasts}
              </div>
              <div className="text-center mt-5">
                {allPodcasts.length > 5 &&
                  (podcastsvisible < allPodcasts.length ? (
                    <button
                      className="bg_theme brdr text-white no_brdr"
                      onClick={() => setpodcastsvisible(podcastsvisible + 4)}
                      style={{ cursor: "pointer" }}
                    >
                      load More
                    </button>
                  ) : (
                    <button
                      className="bg_theme brdr text-white no_brdr"
                      onClick={() => setpodcastsvisible(podcastsvisible - 4)}
                      style={{ cursor: "pointer" }}
                    >
                      Show Less
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
