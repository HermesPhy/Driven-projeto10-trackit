import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

export default function HistoryScreen() {
    return (
        <Section>
            <Header />
            <Container>
                <h1>Preciso ser construido</h1>
            </Container>
            <Footer />
        </Section>
    )
}

const Section = styled.section`
    background-color: #E5E5E5;
    height: 100vh;
    overflow-y: scroll;
`;

const Container = styled.div`
    margin-top: 25%;
    margin-left: 10px;
    display: flex;
    align-items: center;

    h1 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 22.98px;
        color: #126BA5;
    }`;