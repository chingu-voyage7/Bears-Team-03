import React from 'react';
import { Container, Col, Button, Row } from 'reactstrap';
import './App.css';

// Inspiration from Jeremy Bierly https://codepen.io/jbierly/pen/LpYYwW
class YouTube extends React.Component {
  render() {
    const videoSrc = "https://www.youtube.com/embed/" +
      this.props.video + "?autoplay=" +
      this.props.autoplay + "&rel=" +
      this.props.rel + "&modestbranding=" +
      this.props.modest;
    return (
      <div className="video">
        <iframe className="player" type="text/html" width="100%" height="100%"
          src={videoSrc}
        />
      </div>
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <header className="jumbo">
          <Container>
            <div className="intro-text">
              <div className="intro-lead-in">Make the world a better place</div>
              <div className="intro-heading text-uppercase">one project at a time</div>
              <p className="lead">
                <Button className="text-uppercase" color="primary" size="xl" href="/register">Volunteer Now</Button>
              </p>
            </div>
          </Container>
        </header>
        {/* <Jumbotron className="jumbo d-flex flex-column justify-content-around text-center" fluid>
          <h1 className="display-4 col-lg-6 offset-lg-3">Make the world a better place one project at a time</h1>
          <p className="lead">
            <Button color="primary" size="lg">Volunteer Now</Button>
          </p>
        </Jumbotron> */}
        <section id="services">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section-heading text-uppercase">Why choose us</h2>
                <h3 className="section-subheading text-muted">Things that make us unique.</h3>
              </Col>
            </Row>
            <Row className="text-center">
              <Col md="4">
                <span className="fa-stack fa-4x">
                  <i className="fas fa-circle fa-stack-2x text-primary"></i>
                  <i className="fab fa-osi fa-stack-1x fa-inverse"></i>
                </span>
                <h4 className="service-heading">Open source</h4>
                <p className="text-muted">Completely open source, anyone can contribute. There are no secrets.</p>
              </Col>
              <Col md="4">
                <span className="fa-stack fa-4x">
                  <i className="fas fa-circle fa-stack-2x text-primary"></i>
                  <i className="fas fa-globe-europe fa-stack-1x fa-inverse"></i>
                </span>
                <h4 className="service-heading">For Everyone</h4>
                <p className="text-muted">Anyone in the world can use it to create opportunities and help others in need.</p>
              </Col>
              <Col md="4">
                <span className="fa-stack fa-4x">
                  <i className="fas fa-circle fa-stack-2x text-primary"></i>
                  <i className="fas fa-laptop fa-stack-1x fa-inverse"></i>
                </span>
                <h4 className="service-heading">Responsive Design</h4>
                <p className="text-muted">No matter where you are accessing the site you get the best possible experience.</p>
              </Col>
            </Row>
          </Container>
        </section>
        <section id="why">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section-heading text-uppercase">Why we fight</h2>
                <h3 className="section-subheading text-muted">What motivates us to keep going no matter what</h3>
              </Col>
              <YouTube video="RpqVmvMCmp0" autoplay="0" rel="0" modest="1" />
            </Row>
          </Container>
        </section>
        <section className="bg-light" id="team">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
                <h3 className="section-subheading text-muted">Who contributed the most to this project.</h3>
              </Col>
            </Row>
            <Row>
              <Col sm="4">
                <div className="team-member">
                  <img className="mx-auto rounded-circle" src="https://avatars0.githubusercontent.com/u/36927605?s=400&v=4" alt="Avatar of Layer" />
                  <h4>Layer</h4>
                  <p className="text-muted">Lead Developer</p>
                  <ul className="list-inline social-buttons">
                    <li className="list-inline-item">
                      <a href="https://github.com/R-Layer">
                        <i className="fab fa-github"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fa fa-envelope"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col sm="4">
                <div className="team-member">
                  <img className="mx-auto rounded-circle" src="https://avatars1.githubusercontent.com/u/25263346?s=400&u=fcc274f868d5a5b72cc5639d5e7781514e750c1f&v=4" alt="Avatar of Nick" />
                  <h4>Nick</h4>
                  <p className="text-muted">Lead Designer, Developer</p>
                  <ul className="list-inline social-buttons">
                    <li className="list-inline-item">
                      <a href="https://github.com/mikitor">
                        <i className="fab fa-github"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="mailto:torbics.miklos@gmail.com?Subject=Hello">
                        <i className="fa fa-envelope"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="http://hu.linkedin.com/in/miklostorbics">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col sm="4">
                <div className="team-member">
                  <img className="mx-auto rounded-circle" src="https://avatars0.githubusercontent.com/u/17518675?s=400&v=4" alt="Avatar of Phrixus" />
                  <h4>Phrixus</h4>
                  <p className="text-muted">Developer</p>
                  <ul className="list-inline social-buttons">
                    <li className="list-inline-item">
                      <a href="https://github.com/younesbourakadi">
                        <i className="fab fa-github"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fa fa-envelope"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="8" className="mx-auto text-center">
                <p className="large text-muted">We created this project during Chingu Voyage-7. To learn more visit <a href="https://chingu.io/">Chingu.io</a> and our <a href="https://github.com/chingu-voyage7/Bears-Team-03">Github page</a>.</p>
              </Col>
            </Row>
          </Container>
        </section>

        <footer>
          <Container>
            <Row>
              <Col md="4">
                <span className="copyright">Made with <i className="fa fa-heart"></i> by <a href="https://github.com/chingu-voyage7/Bears-Team-03">Bears Team 03</a> in 2019</span>
              </Col>
              <Col md="4">
                <ul className="list-inline social-buttons social-buttons-inverse">
                  <li className="list-inline-item">
                    <a href="https://github.com/chingu-voyage7/Bears-Team-03">
                      <i className="fab fa-github"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </Col>
              <Col md="4">
                <ul className="list-inline quicklinks">
                  <li className="list-inline-item">
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">Terms of Use</a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </footer>
      </div >
    );
  }
}

export default Home;