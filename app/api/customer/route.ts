import { pool } from "@/lib/db";
import { request } from "https";

export async function GET(_request: Request) {

    //Lets say the url of the ASPI is /customer?name=John, 
    //then the value of the query parameter "name" is "John". 
    //For example, if you want to get the value of a query parameter named "name", you can do it like this:
    const { searchParams } = new URL(_request.url);
    const name = searchParams.get("name");


    //Here, you can run a query on the postgres db
    try {
        if(name) {
            const result = await pool.query(
                "SELECT * FROM customer WHERE cname = $1 ORDER BY cname",
                [name] //Queries use $ to reference variables, i.e. $1, $2, $3.
                //All the needed variables are passed in an array as the second argument to the query function.
            );

            //Queries are stored server-side, and only parameters are passed by the user.
            //This protects against SQL injection attacks.

            return Response.json(result.rows);
        } else {
            const result = await pool.query(
                "SELECT * FROM customer ORDER BY cname"
            );

            return Response.json(result.rows);
        }
    } catch (error) {
        console.error("Database error:", error);

        return Response.json(
            { error: "Failed to retrieve customers" },
            { status: 500 }
        );
    }
}