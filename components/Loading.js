import { Circle } from "better-react-spinkit";

function Loading() {
	return (
		<div>
			<center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
				<div>
					<img src="/speakify01.png" style={{ marginBottom: 10 }} alt="logo of app" />
				</div>
				<Circle styel={{marginTop: "20px"}} size={50} color="#8066ff" />
			</center>
		</div>
	);
}

export default Loading;
