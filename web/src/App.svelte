<script>

</script>

<main>
	<container>
		<header-section>
			<header-left>
				<p>dr trendify</p>
			</header-left>
			<header-right>
				<p>menu</p>
			</header-right>
		</header-section>

		<content-container>
			<content>
				<h1>Hi!</h1>
				<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis explicabo cum nemo atque ut obcaecati expedita tenetur deleniti, impedit qui molestias tempora inventore dolorem voluptatibus! Dolorum facere repudiandae odio quibusdam.</p>
			</content>		
		</content-container>

		<footer>
			<p>Footer</p>
		</footer>
	</container>
</main>

<style>
	container {
		width: 100vw;
		min-height: 100vh;

		display: flex;
		flex-direction: column;
		align-content: center;
	}

	header-section {
		width: 80vw;

		display: flex;
		justify-content: space-between;

		margin-left: auto;
		margin-right: auto;
	}

	header-left {

		padding: 2.5vh;
	}

	header-right {

		padding: 2.5vh;
	}

	content-container {
		flex: 1;
	}

	content {
		width: 60vw;

		margin-left: auto;
		margin-right: auto;


		display: flex;
		flex-direction: column;

		align-items: center;
	}

	footer {
		padding-left: 10vw;
		padding-top: 2.5vh;
		padding-bottom: 2.5vh;
	}
</style>