import React from "react";

export const Filters = () => {
	return (
		<form class="filter__form" action="#" method="post">
			<div class="filter__select-wrapper">
				<label for="categories">Категория товаров</label>
				<select id="categories" name="categories">
					<option value="all" selected>
						Все
					</option>
					<option value="estate">Недвижимость</option>
					<option value="laptops">Ноутбуки</option>
					<option value="camera">Фотоаппараты</option>
					<option value="cars">Автомобили</option>
				</select>
				<svg
					width="14"
					height="8"
					viewBox="0 0 14 8"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
					/>
				</svg>
			</div>
			<div class="filter__range">
				<label for="range">Цена, ₽</label>
				<input type="text" id="sampleSlider" />
			</div>
			<div class="filter__estate">
				<fieldset class="filter__type filter__type--estate">
					<legend>Тип недвижимости</legend>
					<ul class="filter__checkboxes-list filter__checkboxes-list--estate">
						<li class="filter__checkboxes-item">
							<input
								class="visually-hidden"
								type="checkbox"
								name="estate-type"
								value="house"
								id="house"
							/>
							<label for="house">Дом</label>
						</li>
						<li class="filter__checkboxes-item">
							<input
								class="visually-hidden"
								type="checkbox"
								name="estate-type"
								value="flat"
								id="flat"
							/>
							<label for="flat">Квартира</label>
						</li>
						<li class="filter__checkboxes-item">
							<input
								class="visually-hidden"
								type="checkbox"
								name="estate-type"
								value="apartments"
								id="apartments"
							/>
							<label for="apartments">Апартаменты</label>
						</li>
					</ul>
				</fieldset>
				<div class="filter__min-square">
					<label for="square">
						Минимальная площать, м<sup>2</sup>
					</label>
					<input
						type="number"
						id="square"
						name="min-square"
						min="1"
						value=""
						placeholder="0"
					/>
				</div>
				<fieldset class="filter__radiobuttons filter__radiobuttons--ram">
					<legend>Количество комнат</legend>
					<ul class="filter__ram-list">
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="rooms"
								value="any"
								id="any_room"
							/>
							<label for="any_room">Любое</label>
						</li>
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="rooms"
								value="one"
								id="one"
							/>
							<label for="one">1</label>
						</li>
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="rooms"
								value="two"
								id="two"
							/>
							<label for="two">2</label>
						</li>
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="rooms"
								value="three"
								id="three"
							/>
							<label for="three">3</label>
						</li>
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="rooms"
								value="four"
								id="four"
							/>
							<label for="four">4</label>
						</li>
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="rooms"
								value="fivemore"
								id="fivemore"
							/>
							<label for="fivemore">5+</label>
						</li>
					</ul>
				</fieldset>
			</div>
			<div class="filter__camera">
				<fieldset class="filter__type filter__type--camera">
					<legend>Тип фотоаппарата</legend>
					<ul class="filter__checkboxes-list filter__checkboxes-list--camera">
						<li class="filter__checkboxes-item">
							<input
								class="visually-hidden"
								type="checkbox"
								name="camera-type"
								value="mirror"
								id="mirror"
							/>
							<label for="mirror">Зеркальный</label>
						</li>
						<li class="filter__checkboxes-item">
							<input
								class="visually-hidden"
								type="checkbox"
								name="camera-type"
								value="digital"
								id="digital"
							/>
							<label for="digital">Цифровой</label>
						</li>
						<li class="filter__checkboxes-item">
							<input
								class="visually-hidden"
								type="checkbox"
								name="camera-type"
								value="mirrorless"
								id="mirrorless"
							/>
							<label for="mirrorless">Беззеркальный</label>
						</li>
					</ul>
				</fieldset>
				<div class="filter__select-wrapper filter__select-wrapper--min-resolution">
					<label for="resolution-matrix">Минимальное разрешение матрицы</label>
					<select id="resolution-matrix" name="resolution-matrix">
						<option value="1mp" selected>
							1 МП
						</option>
						<option value="3mp">3 МП</option>
						<option value="5mp">5 МП</option>
						<option value="7mp">7 МП</option>
						<option value="10mp">10 МП</option>
					</select>
					<svg
						width="14"
						height="8"
						viewBox="0 0 14 8"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
						/>
					</svg>
				</div>
				<div class="filter__select-wrapper">
					<label for="resolution-video">Минимальное разрешение видео</label>
					<select id="resolution-video" name="resolution-video">
						<option value="any" selected>
							Любое
						</option>
						<option value="HD">HD</option>
						<option value="Full_HD">Full HD</option>
						<option value="4K">4K</option>
						<option value="5K">5K</option>
					</select>
					<svg
						width="14"
						height="8"
						viewBox="0 0 14 8"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
						/>
					</svg>
				</div>
			</div>
			<div class="filter__laptop">
				<fieldset class="filter__type filter__type--laptop">
					<legend>Тип ноутбука</legend>
					<ul class="filter__checkboxes-list filter__checkboxes-list--laptop-ram">
						<li class="filter__checkboxes-item">
							<input
								class="visually-hidden"
								type="checkbox"
								name="laptop-type"
								value="ultra"
								id="ultra"
							/>
							<label for="ultra">Ультрабук</label>
						</li>
						<li class="filter__checkboxes-item">
							<input
								class="visually-hidden"
								type="checkbox"
								name="laptop-type"
								value="home"
								id="home"
							/>
							<label for="home">Домашний ноутбук</label>
						</li>
						<li class="filter__checkboxes-item">
							<input
								class="visually-hidden"
								type="checkbox"
								name="laptop-type"
								value="gaming"
								id="gaming"
							/>
							<label for="gaming">Игровой ноутбук</label>
						</li>
					</ul>
				</fieldset>
				<fieldset class="filter__radiobuttons filter__radiobuttons--ram">
					<legend>Минимальный объем оперативной памяти</legend>
					<ul class="filter__radiobuttons-list">
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="ram"
								value="any"
								id="any_ram"
							/>
							<label for="any_ram">Любой</label>
						</li>
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="ram"
								value="4gb"
								id="4gb"
							/>
							<label for="4gb">4 Гб</label>
						</li>
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="ram"
								value="8gb"
								id="8gb"
							/>
							<label for="8gb">8 Гб</label>
						</li>
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="ram"
								value="16gb"
								id="16gb"
							/>
							<label for="16gb">16 Гб</label>
						</li>
					</ul>
				</fieldset>
				<fieldset class="filter__radiobuttons filter__radiobuttons--diagonal">
					<legend>Минимальная диагональ экрана</legend>
					<ul class="filter__radiobuttons-list">
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="diagonal"
								value="any"
								id="any_diagonal"
								checked
							/>
							<label for="any_diagonal">Любая</label>
						</li>
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="diagonal"
								value="13in"
								id="13in"
							/>
							<label for="13in">
								13<sup>″</sup>
							</label>
						</li>
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="diagonal"
								value="14in"
								id="14in"
							/>
							<label for="14in">
								14<sup>″</sup>
							</label>
						</li>
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="diagonal"
								value="15in"
								id="15in"
							/>
							<label for="15in">
								15<sup>″</sup>
							</label>
						</li>
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="diagonal"
								value="17in"
								id="17in"
							/>
							<label for="17in">
								17<sup>″</sup>
							</label>
						</li>
					</ul>
				</fieldset>
				<fieldset class="filter__type filter__type--laptop-processor">
					<legend>Тип процессора</legend>
					<ul class="filter__checkboxes-list filter__checkboxes-list--laptop-processor">
						<li class="filter__checkboxes-item">
							<input
								class="visually-hidden"
								type="checkbox"
								name="laptop-processor"
								value="i3"
								id="i3"
							/>
							<label for="i3">Intel Core i3</label>
						</li>
						<li class="filter__checkboxes-item">
							<input
								class="visually-hidden"
								type="checkbox"
								name="laptop-processor"
								value="i5"
								id="i5"
							/>
							<label for="i5">Intel Core i5</label>
						</li>
						<li class="filter__checkboxes-item">
							<input
								class="visually-hidden"
								type="checkbox"
								name="laptop-processor"
								value="i7"
								id="i7"
							/>
							<label for="i7">Intel Core i7</label>
						</li>
					</ul>
				</fieldset>
			</div>
			<div class="filter__car">
				<div class="filter__select-wrapper">
					<label for="resolution-video">Минимальный год выпуска</label>
					<select id="car_year" name="car_year">
						<option value="1900" selected>
							1900
						</option>
						<option value="1940">1940</option>
						<option value="1960">1960</option>
						<option value="1980">1980</option>
						<option value="2000">2000</option>
					</select>
					<svg
						width="14"
						height="8"
						viewBox="0 0 14 8"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
						/>
					</svg>
				</div>
				<fieldset class="filter__radiobuttons filter__radiobuttons--transmission">
					<legend>Коробка передач</legend>
					<ul class="filter__radiobuttons-list">
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="transmission"
								value="any"
								id="any_transmission"
								checked
							/>
							<label for="any_transmission">Любая</label>
						</li>
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="transmission"
								value="mechanic"
								id="mechanic_transmission"
							/>
							<label for="mechanic_transmission">Механика</label>
						</li>
						<li class="filter__radiobuttons-item">
							<input
								class="visually-hidden"
								type="radio"
								name="transmission"
								value="auto"
								id="auto_transmission"
							/>
							<label for="auto_transmission">Автомат</label>
						</li>
					</ul>
				</fieldset>
				<fieldset class="filter__type filter__type--car-body">
					<legend>Тип кузова</legend>
					<ul class="filter__checkboxes-list filter__checkboxes-list--car-body">
						<li class="filter__checkboxes-item">
							<input
								class="visually-hidden"
								type="checkbox"
								name="car-body"
								value="sedan"
								id="sedan"
							/>
							<label for="sedan">Седан</label>
						</li>
						<li class="filter__checkboxes-item">
							<input
								class="visually-hidden"
								type="checkbox"
								name="car-body"
								value="universal"
								id="universal"
							/>
							<label for="universal">Универсал</label>
						</li>
						<li class="filter__checkboxes-item">
							<input
								class="visually-hidden"
								type="checkbox"
								name="car-body"
								value="hatchback"
								id="hatchback"
							/>
							<label for="hatchback">Хэтчбэк</label>
						</li>
						<li class="filter__checkboxes-item">
							<input
								class="visually-hidden"
								type="checkbox"
								name="car-body"
								value="jeep"
								id="jeep"
							/>
							<label for="jeep">Внедорожник</label>
						</li>
						<li class="filter__checkboxes-item">
							<input
								class="visually-hidden"
								type="checkbox"
								name="car-body"
								value="cupe"
								id="cupe"
							/>
							<label for="cupe">Купэ</label>
						</li>
					</ul>
				</fieldset>
			</div>
			<button class="button filter__button" type="submit">
				Показать
			</button>
		</form>
	);
};
