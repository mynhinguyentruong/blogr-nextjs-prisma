import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

    let drafts = 1
    return {
        props: {
            drafts
        }
    }
}
