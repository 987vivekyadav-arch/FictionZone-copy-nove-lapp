import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home({
    novel,
    setNovel,
    data,
    setData,
}) {

    const [sort, setSort] = React.useState("za");
    const [categories, setCategories] = React.useState("all");

    function filteredData() {

        return data
            .filter(function(item) {

                if(categories === "all"){
                    return true;
                }

                if(categories === item.genre){
                    return true;
                } else {
                    return false;
                }

            })
            .sort(function(a, b) {

                if(sort === "az"){
                    return a.title.localeCompare(b.title);
                } else {
                    return b.title.localeCompare(a.title);
                }

            });
    }


    useEffect(function(){

        fetch("http://localhost:3000/novels")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                setData(data);
            });

    }, []);


    return(
        <div className="home">

            <header className="header">

                <div className="logo">
                    FictionZone
                </div>

                <nav className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/">Novels</Link>
                </nav>

            </header>


            <section className="hero">

                <h1>Read Your Favorite Novels</h1>

                <p>
                    Discover stories, adventures and new worlds.
                </p>

                <div className="search">

                    <input
                        value={novel}
                        onChange={function(event){
                            setNovel(event.target.value);
                        }}
                        placeholder="Search novels..."
                    />

                    <button onClick={function(){

                        fetch(
                            "http://localhost:3000/novels?title=" + novel
                        )
                            .then(function(response){
                                return response.json();
                            })
                            .then(function(data){
                                setData(data);
                            });

                    }}>
                        Search
                    </button>

                </div>

            </section>


            <section className="categories">

                <h2>Categories</h2>

                <div className="category-buttons">

                    <button onClick={function(){
                        setCategories("all");
                    }}>
                        ALL
                    </button>

                    <button onClick={function(){
                        setCategories("Mystery");
                    }}>
                        Mystery
                    </button>

                    <button onClick={function(){
                        setCategories("Romance");
                    }}>
                        Romance
                    </button>

                    <button onClick={function(){
                        setCategories("Action");
                    }}>
                        Action
                    </button>

                    <button onClick={function(){
                        setCategories("Sci-Fi");
                    }}>
                        Sci-Fi
                    </button>

                    <button onClick={function(){
                        setCategories("Fantasy");
                    }}>
                        Fantasy
                    </button>

                </div>

            </section>


            <section className="novels-section">

                <div className="novels-heading">

                    <h2>Latest Novels</h2>

                    <div className="sort-buttons">

                        <button onClick={function(){
                            setSort("az");
                        }}>
                            A TO Z
                        </button>

                        <button onClick={function(){
                            setSort("za");
                        }}>
                            Z TO A
                        </button>

                    </div>

                </div>


                <div className="novel-grid">

                    {filteredData().map(function(item, index){

                        return(

                            <Link
                                to={"/novel/" + item.id}
                                className="novel-card"
                                key={item.id}
                            >

                                <img
                                    src={item.cover}
                                    className="novel-cover"
                                />

                                <div className="novel-info">

                                    <h3>
                                        {item.title}
                                    </h3>

                                    <p>
                                        {item.author}
                                    </p>

                                    <p>
                                        {item.genre}
                                    </p>

                                    <span className="status">
                                        {item.status}
                                    </span>

                                    <p className="description">
                                        {item.description}
                                    </p>

                                </div>

                            </Link>

                        );

                    })}

                </div>

            </section>


            <footer className="footer">

                <p>FictionZone</p>

                <p>
                    Read stories and discover new worlds.
                </p>

            </footer>

        </div>
    );
}

export default Home;