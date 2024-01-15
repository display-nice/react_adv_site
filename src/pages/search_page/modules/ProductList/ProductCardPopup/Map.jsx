import { useMemo } from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/**
	Этот компонент отвечает за показ карты
	Используется в компоненте ProductCardPopup.tsx
*/

// Этот блок обходит баг с импортом иконок в Лефлете, когда иконки теряются, если они не размещены в корне
// Здесь происходит прямой импорт иконок из каталога leaflet в node_modules и подмена путей
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
	iconUrl: markerIcon,
	iconRetinaUrl: markerIcon2x,
	shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

// Кастомная иконка карты
// Нужна для более точного позиционирования маркера. Надо указать точный размер иконки (пиксели) в iconSize
// и указать модификатор (тоже пиксели) в iconAnchor.
// Здесь указана половинная ширина иконки и немного изменённая высота
// url иконки надо обязательно брать из импорта, если указать путь строкой, то иконка не найдётся
const customMarker = new L.icon({
	iconUrl: markerIcon,
	iconSize: [25, 41],
	iconAnchor: [15, 38],
});

// Компонент карты
export const MapComponent = ({ coords }) => {

	// Карта мемоизируется, чтобы она не перерендеривалась при изменении родительского компонента
	// А это может произойти, например, при смене картинки в галерее
	const memoizedMap = useMemo(() => {

		// Сама карта
		// Обёрточный компонент MapContainer для карты взят из react-leaflet и он обязателен.
		function Map() {
			// с map можно использовать стандартные методы leaflet (см. документацию leaflet) внутри react-leaflet
			const map = useMap();
			// Удаляет attribution, т.к. разрабы leaflet вставили туда неотключаемый украинский флаг 
			map.attributionControl.remove();
			return (
				<>
					<TileLayer
						// В урле можно подставить любую другую карту, гугл или яндекс например
						url="http://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}"
						attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					<Marker position={coords} icon={customMarker} />
				</>
			);
		}
		return (
			<MapContainer
				center={coords}
				zoom={13}
				scrollWheelZoom={true}
				style={{ height: "180px", width: "300px" }}
			>
				<Map/>
			</MapContainer>
		);

	}, [coords])	
	return memoizedMap
};