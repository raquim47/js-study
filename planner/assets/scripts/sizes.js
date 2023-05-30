// getBoundingClientRect()
// 요소의 위치와 너비값을 제공

// 요소의 부모를 기준으로 최상단 지점과 요소까지의 거리
// offsetTop
// border의 두께
// clientTop
// 요소의 전체 너비와 높이
// offsetWidth, offsetHeight
// border를 제외한 요소의 너비와 높이
// clinetWidth, clientHeight

// 박스에 보이지 않는 부분(스크롤)을 포함한 요소의 전체 높이
// scrollHeight

// 최상단에서 스크롤한만큼의 값
// scrollTop

// 스크롤이 있는 경우 스크롤바까지 포함한 크기
// window.innerWidth
// window.innerHeight

// -> 대신 이걸 써라 (스크롤바 제외)
// document.documentElement.clientWidth
// document.documentElement.clientHeight

// scrollTo(x, y) 고정값
// scrollBy(x, y) 상대값(현재 스크롤 위치에서 +-)
// 객체를 보낼 수 도 있음
// scrollTo({top:50, behavior:'smooth})

// scrollIntoView() 메서드는 호출된 요소가 현재 뷰포트(viewport)에 나타나도록 스크롤을 조정
// el.scrollIntoView({ behavior: 'smooth' });

{/* <template> 태그는 웹 문서에서 재사용 가능한 템플릿을 정의하는 데 사용됩니다. 이 태그 내의 콘텐츠는 페이지가 처음 로드될 때는 렌더링되지 않습니다. 대신, JavaScript를 사용하여 이 콘텐츠를 사용하고, 필요한 위치에 삽입할 수 있습니다. 이는 동적인 웹 페이지나 웹 애플리케이션에서 특정 구조를 반복적으로 사용해야 할 때 유용합니다. */}
// document.importNode()는 외부 문서에서 가져온 노드를 현재 문서에서 사용할 수 있도록 만드는 메서드, template과 같이 쓰임