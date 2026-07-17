import { pool } from "@/lib/db";

type RouteContext = {
	params: Promise<{ id: string }>;
};

//Next also allows you to define a route with a dynamic parameter, such as /customer/:id.
export async function GET(_request: Request, context: RouteContext) {
	try {
		//Here, the only parameter is "id", which is a string. You can access it like this:
		const { id } = await context.params;

		//Here, you can run a query on the postgres db
		const result = await pool.query(
			"SELECT * FROM customer WHERE cname = $1",
			[id]
		);

		//Dynamic routes are an alternative to query parameters. 
		//They are often used for resources that have a unique identifier, such as a user ID or a product ID.
		
		return Response.json(result.rows);
	} catch (error) {
		console.error("Database error:", error);

		return Response.json(
			{ error: "Failed to retrieve customer" },
			{ status: 500 }
		);
	}
}
