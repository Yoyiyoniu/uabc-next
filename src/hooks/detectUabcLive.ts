import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export const detectUabcLive = () => {
	const [isUabcLive, setIsUabcLive] = useState(false);

	useEffect(() => {
		const checkUabcLive = async () => {
			const res = await axios.get("/uabc/status", {
				withCredentials: true,
			});
			console.log(res);
			if (res.status === 200) {
				console.log("Uabc is live");
				setIsUabcLive(true);
			} else {
				console.log("Uabc is not live");
				setIsUabcLive(false);
			}
		};

		checkUabcLive();
	}, []);

	return { isUabcLive };
};
