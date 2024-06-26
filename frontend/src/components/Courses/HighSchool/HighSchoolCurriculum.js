import React from "react";
import "../../../styles/course.css";
import { Container, Row, Col, Card, Table } from "react-bootstrap";

const HighSchoolCurriculum = () => {
  return (
    <Container fluid>
      <section className="our-course-section">
        <div className="card-course-box">
          <h2 className="course-section-title">Our High School Curriculum</h2>
          <Row className="hs-common-row">
            {/* English Offerings Section */}
            <Col md={4}>
              <div className="curriculum-section">
                <h5 className="main-title">English Offerings</h5>
                <Card.Body>
                  <Table
                    striped
                    bordered
                    hover
                    className="highschool-common-table"
                  >
                    <thead>
                      <tr>
                        <th>Course Title</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                English 1
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Literature Grammar & Compositions, Phil.</td>
                        {/* <td>
                        This course is the first of a four-series program
                        designed to develop and enhance the communication
                        ability in English of high school students. This covers
                        the basics of English, the parts of speech and their
                        effective use in sentences towards fluency, appropriacy,
                        acceptability, and accuracy of both oral and written
                        communication.
                      </td> */}
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                English 2
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Grammar & Composition, Asian Literature</td>
                        {/* <td>
                      This comes in four units: Unit One, on preparing to learn;
                      Unit Two, on towards fluency; Unit Three on towards
                      appropriacy and acceptability; and Unit Four, on towards
                      accuracy. Preparing to learn is a unit anchored on the
                      theme of valuing our past through readings giving values
                      of the past and on self-conditioning lessons focused or
                      commitment of oneself to learning through habitual
                      studying, listening, and reading and making use of the
                      radio, television and movies in learning.
                    </td> */}
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                English 3
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Literature Grammar & Composition, Afro-Asian</td>
                        {/* <td>
                      This presents lessons preparatory to the students learning
                      tasks like those on learning and acquiring fluency,
                      appropriacy, acceptability, and accuracy in English
                      communication. The preparatory lessons are a number of
                      essays motivating the students to realize the meaning and
                      importance of studying and coping with crises in life.
                    </td> */}
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                English 4
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>World Literature, Grammar & Speech</td>
                        {/* <td>
                      <ol>
                        <li>
                          Preparing to learn prepares the student for his study
                          tasks by giving lessons on the use of punctuations, on
                          the mechanics of writing, on outlining, and on
                          preparing a research paper.
                        </li>
                        <li>
                          Towards appropriacy and acceptability is geared
                          towards oral and written argumentation.
                        </li>
                        <li>
                          Towards Accuracy gives lessons on effective expository
                          writing.
                        </li>
                      </ol>
                    </td> */}
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </div>
            </Col>

            <Col md={4}>
              <div className="curriculum-section">
                <h5 className="main-title">Science and Technology Offerings</h5>
                <Card.Body>
                  <Table
                    striped
                    bordered
                    hover
                    className="highschool-common-table"
                  >
                    <thead>
                      <tr>
                        <th>Course Title</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Science and Technology 1
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>General Science</td>
                        {/* <td>
                      Science and Technology I (General Science) studies the
                      principles of Chemistry, Physics and Biological as well as
                      the Earth Sciences. It serves to provide all freshman
                      students with a beginning knowledge of the physical and
                      biological sciences and to offer some insights on how
                      scientific knowledge is acquired. Introduction to Physics
                      is discussed in the succeeding topics with special
                      emphasis on the concept of motion, force, energy and work.
                      A basic knowledge of the relationship of man with his
                      physical environment is discussed in the last units. The
                      learning units and activities presented allow students to
                      understand what Science is through actual experiments and
                      other related experiences, thus developing a respect for
                      teamwork and the dignity of manual work.
                    </td> */}
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Science and Technology 2
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Biology</td>
                        {/* <td>
                      The course is designed to develop in each student an
                      interest in biological science by learning about living
                      organisms and how they can apply this knowledge to common
                      life situations. The course also describes technological
                      developments, exposing students to new and exciting
                      discoveries that have made ways of doing things better and
                      more efficient.
                    </td> */}
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Science and Technology 3
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Chemistry</td>
                        {/* <td>
                      This is a two unit subject that makes use of the
                      descriptive and experiential approach of instruction
                      through lectures-discussion, research, projects,
                      experimentation, trips. The course offers opportunities
                      for students to develop skills in qualifying and
                      quantifying data, performing and designing simple
                      experiments and explaining scientific concepts.
                    </td> */}
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Science and Technology 4
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Physics</td>
                        {/* <td>
                      Since Physics is the science of energy, the course covers
                      the different forms of energy; Mechanical Energy under
                      Mechanics, Heat or Thermal Energy, Light Energy and Sound,
                      Electrical Energy and Nuclear Energy.
                    </td> */}
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </div>
            </Col>

            <Col sm={4}>
              <div className="curriculum-section">
                <h5 className="main-title">Filipino Offerings</h5>
                <Card.Body>
                  <Table
                    striped
                    bordered
                    hover
                    className="highschool-common-table"
                  >
                    <thead>
                      <tr>
                        <th>Course Title</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Filipino 1
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Wika, Ibong Adarna</td>
                        {/* <td>
                      Sa kabuuan, ang kursong Filipino I-IV sa mataas na
                      paaralan, sa pamamagitan ng mga araling pangwika at
                      pampanitikan ay naglalayong mabisang malinang ang mga
                      kaalaman at kasanayang pangkomunikatibo ng mga mag-aaral,
                      at mahasa ang kanilang kakayahan sa pagbasa, pakikinig,
                      pagsasalita, at pagsusulat. Bilang pag-alinsunod sa mga
                      makabagong kalakarang pangwika at sa bagong kurikulum sa
                      Filipino isinasaalang-alang din ang pagbibigay-diin sa mga
                      pagpapahalagang Pilipino tulad ng mga katangiang moral at
                      ispiritwal, sosyal, pulitikal, at iba pang aspekto ng
                      pamanang kulturang iniwan sa atin ng lumang kabihasnan
                      upang maiangkop ang mga ito sa makabagong takbo ng buhay.
                      Pinag-uukulan din ng pansin ang paglinang sa kakayahan ng
                      mga mag-aaral sa pagbibigay-kuro, paggawa ng tala,
                      pakikipanayam, pagsulat ng mga liham, pagsunod sa mga
                      panuto, panimulang pag-aaral at pag-unawa sa
                      pagsasaling-wika at pananaliksik at iba pang makatutulong
                      sa paghubog ng diwa at kaisipang maka-Filipino.
                      Inaasahang, sa pamamagitan ng paglinang ng mga kaisipang
                      napapaloob sa mga araling pang-wika at pampanitikan,
                      magkakaroon ng kaganapan ang pangunahing layunin ng
                      edukasyon para sa mga kabataan, at matatamo ang isang uri
                      ng mapaglaya, demokratiko, at makabayang edukasyon tungo
                      sa matibay na sandigan para sa pambansang kaunlaran.
                    </td> */}
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Filipino 2
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Wika, Florante at Laura</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Filipino 3
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Wika, Noli Me Tangere</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Filipino 4
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Wika, El Filibusterismo</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </div>
            </Col>
          </Row>

          <div className="horizontal-divider" />

          <Row className="hs-common-row">
            <Col sm={4}>
              <div className="curriculum-section">
                <h5 className="main-title">
                  Technology and Livelihood Education Offerings
                </h5>
                <Card.Body>
                  <Table
                    striped
                    bordered
                    hover
                    className="highschool-common-table"
                  >
                    <thead>
                      <tr>
                        <th>Course Title</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Technology and Livelihood Education I
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Home Economics and Clothing</td>
                        {/* <td>
                      The focus of the subject is the Basic Fundamental
                      Knowledge in clothing. The preliminary skills in sewing
                      and knowing the proper use of sewing tools and equipment
                      in support of the Home Economics Laboratory provided by
                      the school. The subject is intended to provide classroom
                      and laboratory experiences that will enable the students
                      to gain understanding and acquire competencies in various
                      economics activities as they relate to Home Economics.
                    </td> */}
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Technology and Livelihood Education II
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Business Planning</td>
                        {/* <td>
                      The subject features business planning through computer
                      technology and using both human and material resources
                      that design or set goals can be achieved.
                    </td> */}
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Technology and Livelihood Education III
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Entrepreneurship</td>
                        {/* <td>
                      A prepared set of objectives in every chapter is outlined
                      to give the students an overview of what they are expected
                      to attain. The concept of Entrepreneurship discusses the
                      status of the economy through the help of entrepreneurs,
                      the objective of the subject matter is to show how the
                      circulation of money was developed.
                    </td> */}
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Technology and Livelihood Education IV
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Basic Accounting and Management</td>
                        {/* <td>
                      A feasibility study involves gathering analyzing and
                      evaluating information on business management.
                      Bookkeeping/accounting is a tool that can enable the user
                      to record, classify, summarize, and interpret money
                      matters specifically in the field of business and
                      accounting. In line with the advancement of technology.
                    </td> */}
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </div>
            </Col>
            <Col sm={4}>
              <div className="curriculum-section">
                <h5 className="main-title">Mathematics Offerings</h5>
                <Card.Body>
                  <Table
                    striped
                    bordered
                    hover
                    className="highschool-common-table"
                  >
                    <thead>
                      <tr>
                        <th>Course Title</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Mathematics I
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Algebra, Geometry and Consumer Math</td>
                        {/* <td>
                      Our math subjects expose the students to three different
                      skills: the conceptual skill, computation, and application
                      skills. They are provided with varied problem solving
                      activities to develop their analytical and critical
                      thinking. Enrichment lessons are also provided especially
                      in higher Math subjects. The degree of difficulty of the
                      lesson varies as one goes from one level to another.
                    </td> */}
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Mathematics II
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Algebra, Geometry</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Mathematics III
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Advanced Algebra, Geometry and Statistics</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Mathematics IV
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Advanced Algebra, Statistics and Trigonometry</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Math Elective
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Analytic Geometry & Introduction to Calculus</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </div>
            </Col>
            <Col sm={4}>
              <div className="curriculum-section">
                <h5 className="main-title">Social Studies Offerings</h5>
                <Card.Body>
                  <Table
                    striped
                    bordered
                    hover
                    className="highschool-common-table"
                  >
                    <thead>
                      <tr>
                        <th>Course Title</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Social Studies 1
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Philippine History and Government</td>
                        {/* <td>
                      Courses in Social Studies use English as the medium of
                      instruction. In the first year level, the history of the
                      Philippines, from the ancient times to the present is
                      studied. The approach is integrated with other sciences
                      and is thematic in its contents.
                    </td> */}
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Social Studies 2
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Asian History</td>
                        {/* <td>
                      Interesting and analytical discussion of the different
                      topics in Asian History is given emphasis. Topics include
                      history, civilization, government, religion, arts,
                      education, geography, wars and empires of Asian countries.
                      It considers new information and relevant historical facts
                      in the discussion of issues and current events that have
                      affected Asia in the past and recent years.
                    </td> */}
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Social Studies 3
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>World History</td>
                        {/* <td>
                      The course presents an updated account of world history
                      from ancient and medieval periods down to contemporary
                      times. It includes the early beginnings of human
                      civilization. Historical facts and concepts are taught in
                      thematic units rather than in the traditional
                      chronological approach.
                    </td> */}
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Social Studies 4
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>Economics</td>
                        {/* <td>
                      The basic principles and concepts of Economics, and the
                      importance of the knowledge of economics to the nation are
                      taught. Related and interesting issues affecting our
                      nation and the world are analyzed. Values regarding
                      awareness about the state of our environment and natural
                      resources, socio-economic problems, good housekeeping, and
                      the like are integrated.
                    </td> */}
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </div>
            </Col>
          </Row>

          <div className="horizontal-divider" />

          <Row className="hs-common-row">
            <Col sm={6}>
              <div className="curriculum-section">
                <h5 className="main-title">PEHMA Offerings</h5>
                <Card.Body>
                  <Table
                    striped
                    bordered
                    hover
                    className="highschool-common-table"
                  >
                    <thead>
                      <tr>
                        <th>Course Title</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Physical Education I - IV
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>
                          Covers activities that would give an all-around
                          physical development of the students through various
                          games, individual & team sports, dances, etc.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Health I - IV
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p>
                            Health I deals with the physiological and biological
                            changes in this stage of their life and teaches them
                            how to cope with these and how to adjust to the
                            changing environment.
                          </p>
                          <p>
                            Health II deals with the different sicknesses,
                            common ailments, and their prevention.
                          </p>
                          <p>
                            Health III gives emphasis not only on physical
                            health but also on the mental and emotional aspects
                            of one’s growth.
                          </p>
                          <p>
                            Health IV covers personality development including
                            the acquisition of knowledge about sex, population
                            education, and community health.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Music I - IV
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>
                          Deals with the various aspects of music education, the
                          development of the appreciation for music, the
                          development of the love for Kundiman, and other
                          classical songs as well. It also involves training to
                          enhance students' talent in singing vocalization and
                          note reading.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Arts I - IV
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>
                          Deals with the elements of arts and likewise gives
                          freedom of self-expression as well as the opportunity
                          to develop creative potential.
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </div>
            </Col>
            <Col sm={6}>
              <div className="curriculum-section">
                <h5 className="main-title">
                  Religion and Christian Values Education Offerings
                </h5>
                <Card.Body>
                  <Table
                    striped
                    bordered
                    hover
                    className="highschool-common-table"
                  >
                    <thead>
                      <tr>
                        <th>Course Title</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-start mb-2">
                            <div>
                              <Card.Title className="course-section-text mb-0">
                                Religion I - IV
                              </Card.Title>
                            </div>
                          </div>
                        </td>
                        <td>
                          The Religion Program, as the core of the High School
                          Curriculum is committed to the formation of every
                          student into a mature human person through a deeper
                          understanding of God in his daily Christian life.
                          <p>
                            The course seeks to make students aware of God’s
                            purpose of salvation. It upholds man’s dignity as a
                            person created in the image and likeness of God. The
                            gift of faith man receives through the sacraments of
                            Baptism unites him with the Father through Jesus
                            Christ in the Holy Spirit. Man is sanctified by the
                            Holy Spirit to share in the mission of Christ as an
                            active member of the Christian community, the
                            church.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </Container>
  );
};

export default HighSchoolCurriculum;
