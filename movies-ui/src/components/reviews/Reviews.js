import { useEffect, useRef} from "react";
import api from '../../api/axiosConfig';
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";
import { useState } from "react";
import useCurrentUserStore from '../../store/useStore.js';
const Reviews = () => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;
    const [movie,setMovie] = useState()
    const [reviews,setReviews] = useState([])
    const getMovieData = async (movieId) => {
        try {
          const response = await api.get(`/api/v1/movies/${movieId}`);
          const singleMovie = response.data;
          setMovie(singleMovie);
          setReviews(singleMovie.reviewIds);
        } catch (err) {
          console.log(err);
        }
    }

    useEffect(()=>{
        getMovieData(movieId)
    },[])

    const currentUser = useCurrentUserStore((state) => state.currentUser);
    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;
        try {
            const response = await api.post("/api/v1/reviews", { reviewBody: rev.value, imdbId: movieId, username: currentUser.username });
            console.log(response);
            const updatedReviews = [...reviews, { body: rev.value,username : currentUser}];
            rev.value = "";
            setReviews(updatedReviews);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col><h3>Reviews</h3></Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <img src={movie?.poster} alt="" />
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a review?" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                        {
                            reviews?.map((r, index) => {
                                return (
                                    <div key={index}>
                                        <Row>
                                            <Col>{r.user?.username}</Col>
                                            <Col>{r.body}</Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <hr />
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            })
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Reviews;
