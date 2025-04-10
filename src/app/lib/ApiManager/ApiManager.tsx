type ApiManagerType = {
    path: string;
    method?: "get" | "post" | "put" | "delete";
    header?: Record<string, string | boolean>;
    baseUrl?: string;
    responseType?: "json" | "text" | "blob" | "arraybuffer";
};

export default async function ApiManager({
    path,
    method = "get",
    header = {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
    },
    baseUrl = "https://dummyjson.com/",
    responseType = "json",
}: ApiManagerType) {
    const startingUrl = "https://dummyjson.com/";
    const fullUrl = baseUrl + path;


    // Convert boolean values to string in the headers object
    const stringHeaders: Record<string, string> = Object.fromEntries(
        Object.entries(header).map(([key, value]) => [key, String(value)])
    );
    try {
        // Pass `header` directly to the `headers` field
        let result = await fetch(fullUrl, {
            method: method,
            headers: stringHeaders, // Directly use `header` here
        })
        if (result.ok) {
            return result.json();  // Return the parsed JSON data
        } else {
            throw new Error(`Request failed with status: ${result.status}`);  // Handle error if not ok
        }
    } catch (error: any) {
        return error;  // Return null or handle accordingly if an error occurs
    };
}


// * how to use it
// ApiManager({
//     path: "/products",
//     method: "get",
//     header: {
//       "Authorization": "Bearer your_token_here",
//       "ngrok-skip-browser-warning": true, // This will now be converted to "true"
//     },
//     baseUrl: "https://example.com/api/",
//     responseType: "json", // or "text", "blob", "arraybuffer"
//   });