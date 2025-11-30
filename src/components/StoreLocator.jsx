import React, { useState, useEffect } from "react";
import storeData from "../store/Store";
import "./scss/StoreLocator.scss";

const StoreLocator = () => {
  const [stores, setStores] = useState(storeData);
  const [userLocation, setUserLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  const getCoordinatesFromAddress = (address) => {
    const cityCoordinates = {
      송파구: { lat: 37.5145, lng: 127.106 },
      성남시: { lat: 37.4201, lng: 127.1262 },
      하남시: { lat: 37.5394, lng: 127.2148 },
      강남구: { lat: 37.5172, lng: 127.0473 },
      서초구: { lat: 37.4837, lng: 127.0324 },
      안양시: { lat: 37.3943, lng: 126.9568 },
      용산구: { lat: 37.5326, lng: 126.9905 },
      관악구: { lat: 37.4783, lng: 126.9515 },
      부산: { lat: 35.1796, lng: 129.0756 },
      수원시: { lat: 37.2636, lng: 127.0286 },
      영등포구: { lat: 37.5264, lng: 126.8962 },
      구로구: { lat: 37.4954, lng: 126.8874 },
      양천구: { lat: 37.517, lng: 126.8664 },
      부천시: { lat: 37.5034, lng: 126.766 },
      화성시: { lat: 37.199, lng: 126.831 },
      안산시: { lat: 37.3219, lng: 126.8309 },
      용인: { lat: 37.2411, lng: 127.1776 },
      인천: { lat: 37.4563, lng: 126.7052 },
      시흥: { lat: 37.38, lng: 126.8028 },
    };

    // 주소에서 구/시 추출
    for (const [city, coords] of Object.entries(cityCoordinates)) {
      if (address.includes(city)) {
        return coords;
      }
    }

    return { lat: 37.5665, lng: 126.978 };
  };

  // 현재 위치 가져오기
  const getCurrentLocation = () => {
    setLoading(true);

    if (!navigator.geolocation) {
      alert("브라우저가 위치 서비스를 지원하지 않습니다.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserLocation(location);
        setLoading(false);
        setSortBy("distance");
      },
      (error) => {
        alert("위치 정보를 가져올 수 없습니다. 위치 권한을 확인해주세요.");
        setLoading(false);
        console.error(error);
      }
    );
  };

  // 매장 필터링 및 정렬
  const getFilteredAndSortedStores = () => {
    let filtered = stores;

    // 검색어 필터링
    if (searchTerm) {
      filtered = stores.filter(
        (store) =>
          store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          store.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 정렬
    if (sortBy === "distance" && userLocation) {
      filtered = [...filtered]
        .map((store) => {
          const storeCoords = getCoordinatesFromAddress(store.address);
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            storeCoords.lat,
            storeCoords.lng
          );
          return { ...store, distance };
        })
        .sort((a, b) => a.distance - b.distance);
    } else if (sortBy === "name") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  };

  const filteredStores = getFilteredAndSortedStores();

  return (
    <div className="store_locator">
      <div className="store_locator_header">
        <h1 className="store_locator_title">
          <span className="crocs_logo">crocs</span> 매장 찾기
        </h1>
        <p className="store_locator_subtitle">
          가까운 크록스 매장을 찾아보세요
        </p>
      </div>

      <div className="search_section">
        <div className="search_box">
          <input
            type="text"
            placeholder="매장명 또는 지역으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search_input"
          />
          <button
            onClick={getCurrentLocation}
            disabled={loading}
            className="location_button"
          >
            {loading ? "위치 찾는 중..." : "✔️ 현재 위치"}
          </button>
        </div>

        <div className="sort_section">
          <label>정렬:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort_select"
          >
            <option value="default">기본순</option>
            <option value="distance" disabled={!userLocation}>
              거리순 {!userLocation && "(위치 정보 필요)"}
            </option>
            <option value="name">이름순</option>
          </select>
        </div>

        {userLocation && (
          <div className="location_info">
            현재 위치가 설정되었습니다. (위도:{" "}
            {userLocation.latitude.toFixed(4)}, 경도:{" "}
            {userLocation.longitude.toFixed(4)})
          </div>
        )}
      </div>

      <div className="store_list_section">
        <div className="store_count">
          총 <strong>{filteredStores.length}</strong>개의 매장
        </div>

        <div className="store_list">
          {filteredStores.map((store) => (
            <div key={store.id} className="store_item">
              <div className="store_info">
                <h3 className="store_name">{store.name}</h3>
                <p className="store_address">{store.address}</p>
                {store.distance && (
                  <p className="store_distance">
                    ✔️ 현재 위치에서{" "}
                    <strong>{store.distance.toFixed(1)}km</strong>
                  </p>
                )}
              </div>
              <div className="store_actions">
                <button
                  className="btn_directions"
                  onClick={() =>
                    window.open(
                      `https://map.kakao.com/link/search/${store.name}`,
                      "_blank"
                    )
                  }
                >
                  길찾기
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <div className="no_results">
            <p>검색 결과가 없습니다.</p>
            <p>다른 검색어를 입력해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreLocator;
