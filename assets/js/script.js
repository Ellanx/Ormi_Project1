
// openAI API
let url = 'https://estsoft-openai-api.jejucodingcamp.workers.dev/';

// 질문과 답변 저장
let data = [
    {
        role: 'system',
        content: 'assistant는 영화를 추천해 주는 전문가이다.',
    },
    {
        role: 'system',
        content: 'user가 주는 정보를 토대로 정확하게 최신 영화순으로 전달한다.',
    },
    {
        role: 'system',
        content: '영화 추천은 최소 3개를 한다.',
    },
    {
        role: 'system',
        content: `
        <예시>
        1순위
        제목: 겨울왕국,
        개봉연도: 2000년,
        줄거리: 눈을 다루는 공주에 관한 이야기,
        추천 이유: 추천받기 원하는 장르로서 가족영화에 속합니다. 많은 사랑을 받은 영화이고 지금까지도 회자되고 있는 영화중 하나입니다.

        2순위
        제목: 인어공주,
        개봉연도: 2023년,
        줄거리: 바다에 사는 인어가 인간이 되고자 하는 이야기,
        추천 이유: 최근 가장 인기있는 영화로 떠오르며 가족이 보기에 적절한 영화다.

        3순위: 제목: 스즈메의 문단속,
        개봉연도: 2023년,
        줄거리: 재앙과 맞서 싸우는 학생들의 이야기,
        추천 이유: 가족과 떨어진 삶에 대해 이야기하며 또한 일본 지진에 관련된 내용을 보여주며 최근 많은 사랑을 받은 애니메이션 중 하나다  
    `,
    },
];

const $movieGenre = document.querySelector('#genre');
const $movieYear = document.querySelector('#moive_year');
const $movieInfo_plus = document.querySelector('#movie_plus');
const $button = document.querySelector('#recommend-button');
const $chatContent = document.querySelector('#chat-content');

// AI에게 전달할 문장을 만들어서 보내기
function makeData() {
    const userInputData = `나는 ${$movieGenre.value} 장르를 선호하고 ${$movieYear.value}년도 쯤에 나온 영화로 ${$movieInfo_plus.value} 이란 추가적인 내용을 가진 영화를 추천해줘.`;

    data.push({
        role: 'user',
        content: userInputData,
    });
}

function emptyValue() {
    $movieGenre.value = null;
    $movieYear.value = null;
    $movieInfo_plus.value = null;
}

function makeQuestion() {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        redirect: 'follow',
    })
        .then((res) => res.json())
        .then((res) => {
            const recommendedMovies = res.choices[0].message.content;
            $chatContent.value = recommendedMovies;
            document.location.href = '#contents';
        });
}

$button.addEventListener('click', (e) => {
    e.preventDefault();
    makeData();
    emptyValue();
    makeQuestion();
});