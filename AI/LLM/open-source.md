## 섹션 1: Introduction and overview

### 2. Course Overview

section 6 에서 크롤링 한 걸 만든다. 

section 7 에서 agent 를 만든다. → 그러면 agent 에게 일을 시키기 좋겠다. 

### 3. My Goal and Some Tips (LMS 에 대해 배울 수 있음. Agent 를 만들 수 있음.)

LMS 에 대해 배울 수 있음. 

agent 를 만들 수 있음. 

(이걸 사용할 수 있음)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/39390848-1688-45d8-817a-44e8c3e407a5/image.png)

### 4. Explanation of the Links

[Untitled Database](https://www.notion.so/ffc24cae475842c39354f7290287b407?pvs=21)

[Links.pdf](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/766c8137-b22c-4484-92e3-5ee329fd26e6/Links.pdf)

## 섹션 2: Why Open-Source LLMs? Differences, Advantages, and Disadvantages

### 6. What is this Section about?

- LLM , 토큰 , 중요성
- LMS 가 뭔지. 어떻게 BEST LMS 를 찾을 수 있는지
- 오픈 소스, 클로즈드 소스의 장단점 이해 → 그래야, open source LLM 을 사용하는 이유를 알게 됨

### 7. What are LLMs like ChatGPT, Llama, Mistral, etc. (#`pre-training` , fine-tuning, reinforcement, 등에 대해서, 아직 제대로 개념 이해가 안 된 부분이 있음 #📛📛📛📛📛)

- `10 테라바이트(TB) 텍스트` (ex : 뉴스 기사, 인터넷 자료 등) 를 사용해서 → `70 billion paremeter` 를 학습 시킨다.
- `10 TB` 을 `GPU` 를 활용해서 압축한다 → `140GB` 가 된다. (압축파일 `.zip` 과 비슷하다고 생각하면 된다.)
- 이 압축된 파일이 `parameter file` 이다.
    - [요약] parameter file 은 1) `70 billion 개의 parameer` 를 학습 시킨 것 (학습 대상은 parameter) 2) 학습 시킨 자료는 10 TB 의 텍스트 3) 학습에는 GPU가 활용되었다. 4) 그 결과물이 `140GB 의 zip 파일` 이다.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/beb1a590-6bec-4668-88cd-604a456df490/image.png)

- 실행 파일
    - `오픈 소스` vs `폐쇄 소스` 로 구분될 수 있음.
    - 오픈 소스 중, 라마는, 다운받아서 사용할 수 있음.
    - 폐쇄형 LMS 의 몰락 (#잘 이해는 안 됨)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/96af0314-65d7-4713-955f-b01fbcbe487a/image.png)

- transformer 의 사용
    - neutral network (LLM 의 단계)
        1. (pre-training) 기본 훈련을 통해 ‘how text is structured’ 되어 있는지를 `확률적` 으로 인식
            1. 굉장히 큰 text 파일 → gpu 를 이용해서, smaller 파이롤 변환
        2. (fine tuning) LLM 에게, how humans want to have response를, 알려준다. 
            - ex) 컴퓨터에게 “what should i eat?” 이라는 질문을 받으면, “you could eat steak” 를 대답할 수 있도록, “정보를 feed” 한다.  → 그러면, 처음에 컴퓨터는 “what should i eat?” 이라는 질문을 받으면 “엉뚱한 답” 을 하다가 → “정보를 feed” 받을 수록 → “정답” (인간이 유도한 방향) 을 내뱉는다.
            - 이 단계를 open source 모델을 통해서 활용할 수 있다.
        3. reinforcement learning (3단계) 
            1. 인간이, ‘질문’ 을 한다. 
            2. 컴퓨터가 ‘대답’ 을 한다. 
            3. 컴퓨터의 대답에 대해서 ‘good or not’ 을 알려준다. 
        - sees words → predict what next word comes

- neural net 에서의 weight
    - tokens 의 역할
        - ‘다음 단어로 나올 가능성이 가장 높은 단어’ 를 알 수 있게 함
    - token 의 예시 (https://platform.openai.com/tokenizer)
        
        ```jsx
        각 단어들은 21글자 
        글자를 합친게 token (단어, 의미 구문 이겠지.) 
        각 token 에는 id 가 할당 
        
        ```
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/feb0cba6-a6c1-4bc4-998b-3f32200bc244/image.png)
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/3992270f-fca6-467a-9d3c-0ac598673abe/image.png)
        
        ![모든 단어 하나 = 하나의 토큰이 아니기도 함 
        ex) Sequence = se + quence 토큰의 합  ](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/78f31f80-0405-455d-9143-23a33e09c837/image.png)
        
        모든 단어 하나 = 하나의 토큰이 아니기도 함 
        ex) Sequence = se + quence 토큰의 합  
        
    
    - token 을 보여주는 이유
        - LLM 이 이해할 수 있는 token 의 개수에는 한계
        - 예시) OPEN AI의 토큰 정책 ([what are tokens and how to count them](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them))
            
            ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/94e9d3b0-4b26-4026-8031-a00aa3aa120b/image.png)
            
        - LLM 마다 TOKEN LIMIT 이 다름 ⭐⭐⭐⭐⭐
            - 대략 100,000 단
            
            ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/a048cfd0-eb78-4ef7-8893-11dda0e70e20/image.png)
            
        
        - TOKEN 이 LIMIT 에 도달하면, 이전에 이야기 했던 것을 이해하지 못 함 ⭐⭐⭐⭐⭐ (#LLM 마다 token 정책을 알아야 하는 이유)
            - not know previous question and answer. ⭐⭐⭐⭐⭐
            - last few tokens 에 대해서만 알고 있다.  ⭐⭐⭐⭐⭐
            
            ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/f63cc147-cd40-4962-8bf8-d018f3a69a4d/image.png)
            
        - gpt 가 보유하고 있는 지식을 늘리기 위해 DirectX 등 의 기술이 있음 ⭐⭐⭐⭐⭐⭐⭐⭐⭐ ( #token 의 한계 극복하는 기술을 배워야 함)

- 우리에게 있는 파일
    - run file
        - parameter file 을 실행시킴
    - parameter file
        - pre trained(수 많은 단어들을 가져와서 → 압축한다) 된 파일 (#❓❓❓❓❓ pre-training 개념이 애매함)
        - fine tuning (이 결과물이 parameter file 안에 있나? #❓❓❓❓❓ )
        - reinforcement   (이 결과물이 parameter file 안에 있나? #❓❓❓❓❓)
    - 그 다음 neural nets
        - words → token 으로 나눔
        - 현재 token 을 보고 → “다음으로 어떤 token 이 가장 확률이 높을지” 를 계산
        - token limit 이 있기 때문에, last few token 만 기억함

- 우리가 할 수 있는 것
    - run file 과 parameter file 을 다운받고, 실행시킬 수 있음.
        - 이걸 closed LLM 에서는 못 함

- 프롬프트 엔지니어링
    - GOOD QUESTION → GOOD RETURN

### 8. Which LLMs are available and what should I use: Finding "The Best LLMs” (# LMSYS 와 HUGGINFACE 에서 LLM 모델 비교하고, 선택하는 방법)

- LLM 평가 할 수 있는 사이트
    - https://chat.lmsys.org/?leaderboard
        - CLOSED LLM ex) gpt, gemini , 같은 것들
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/c5dd8ec1-8a7d-44dc-8842-b582d0a31cc5/image.png)
        
        - category 를 `coding` 으로 선택 → 해당 분야에서 잘 하는 모델이 나옴 ⭐⭐⭐⭐⭐
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/7b4585b5-d6e2-4444-9bd0-8c09d14d4fba/image.png)
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/3b026b80-19ee-47a5-b473-b9091c560852/image.png)
        
        (여기 deepseek 이라는 회사 모델도, 코딩에 괜찮다고 하네) 
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/02e6c026-5038-4527-82e7-04f6ecd28c06/image.png)
        
        (한국어도 이렇게 볼 수 있음) 
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/eba04e96-1a99-4075-8d53-c857e8207a16/image.png)
        
    
    - https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard
        - open LLM 모델들의 순위가 나옴
            - META LAMA
            - MS - PI THREE
            - cohere - 000 회사
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/90b17174-d9df-4550-8610-31833e24a0d0/image.png)
        

### 9. Disadvantages of `Closed-Source LLMs` like ChatGPT, Gemini, and Claude

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/b4a4f9b4-515c-4aae-beb0-ce92aab22e31/image.png)

- privacy
    - 이 모델에 사용된 데이터는, 해당 모델을 다시 학습 시킬 때 사용된다.

 

### 10. Advantages and Disadvantages of Open-Source LLMs like Llama3, Mistral & more (# 로컬에서 돌리고 싶어하는 수요가 있지는 않을까? #local 에서 돌리려면 시스템이 필요함 #open source vs closed source 의 차이 요약 #회사 상황에 따라 다를 것 같다. 나는 정보 보안이 그렇게 중요하지는 않아. 개인이니까. 그런데, 정부 기관 같은 곳은 그렇지 않을 거 같아)

- [단점] 로컬에서 실행하려면, ‘좋은 머신’ 이 필요함
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/1a6fa524-47f7-4ceb-bf28-0d46e7ef4de5/image.png)
    
- [단점] 현재 기능이, closed-source 에 비해 좋지 않음
- [단점] local 에서 돌리려면, `시스템` 이 필요함 (#⭐⭐⭐ 이게 뭘까?)
- [장점]
    - privacy
        - 자사 데이터가 유출이 안 돼
    - api 비용 안 나감.
    - `네트워크 속도에 따른 응답 속도` 에 delay 가 없음
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/aa735194-fa3b-47f1-8de6-94f137effd0f/image.png)
    

### 11. Recap: Don't Forget This!

- 단계들 (#⭐⭐⭐⭐⭐)
    - (input) 인터넷에 있는 text 들 → (process) GPU 를 통해 compress → (output) zip file (parameter file)
    - zip file 로 hallucinations(환각. 아무런 말이나 지어내는 것?, 이 단계가 pre-trained 단계) 을 만들 수 있음.
    - fine-tuning
    - reinforcement

- learning 이란
    - same circumstances but different behavior

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/025c5bf7-a019-4be5-abbf-e01ca3fc4d8d/image.png)

## 섹션 3 : The easiest way to run open source LLMs locally & what you need

### 12. Requirements for Using Open-Source LLMs Locally: GPU, CPU & Quantization

- gpu
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/fa572327-d4e7-42ee-a5e8-a9ca690dbd13/image.png)
    
- cpu : intel cpu 가 베스트 이지만, amd 도 괜찮음
    
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/b4243ee1-3ffd-43a5-af39-6b0197d213a1/image.png)
    
- quantification
    - quantized model → less GPU
    - storing and processing number 를 할 때
        - `32-bit` 에서 → `8-bit` , `4-bit` 로 진행
        - `8-bit` 베이스로 만들어진게 → `Q8` 모델 : 이 모델도 성능이 괜찮음 ⭐
        - `4-bit` 베이스로 만들어진 것 → `Q4` 모델
    - smaller Q number → 속도 빨라짐. 정확도 떨어짐.
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/f1282c7d-8090-4da3-8371-8adfd4fdfced/image.png)
    
    - `Q8` 과 `Q4` 은 화질 구분과 비슷
    
    ```jsx
    Quatizize model 을 쓰는 것은 '비디오 화질' 을 선택하는 것과 비슷
    ```
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/1594188d-d9d4-4296-a27a-fa7867928478/image.png)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/c556921a-7eed-488d-8926-51f4383a6c3d/image.png)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/6ff97161-f59d-4992-9d5f-c7ab7a4b74ca/image.png)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/e9ba103e-a62e-408d-bbb5-e8e5ff02e3f2/image.png)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/5ec56677-240b-47f9-a312-75a74ae62360/image.png)
    

### 13. Installing LM Studio and Alternative Methods for Running LLMs

- [open source 챗봇 사용할 수 있는 방법] arena (#cloud 기반)
    
    (arena 에 가서, 어떤 챗봇이, 어떠한지를 알 수 있음) 
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/85f48faf-a51d-4071-8d95-7c18dd19ad1a/image.png)
    
- [open source 챗봇 사용할 수 있는 방법] hugging face ( #hugging chat 안에 함수 호출 도 있음 ) (#cloud 기반)
    
    [HuggingChat](https://huggingface.co/chat/)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/c32d0c34-3aa7-439d-af5b-6db421870e80/image.png)
    
- grok (#cloud 기반)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/1ea021cc-58b9-4190-b2fe-8d18e238674e/image.png)
    

- [local 에서 사용하려면] LM STUDIO ⭐⭐⭐⭐⭐
    
    
    [👾 LM Studio - Discover and run LLMs locally](https://lmstudio.ai/)
    
    [👾 LM Studio - Discover and run LLMs locally](https://lmstudio.ai/)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/d5406010-f96a-47a4-a2f8-5c76803dafd4/image.png)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/e934931d-efec-47a0-b2db-6fb4a580c59d/image.png)
    
    (여기에서 이거 눌러서 다운) 
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/21760701-204c-4f8b-b42b-52a7cc9e5fcc/image.png)
    
    (그리고 설치하면 → 나옴) 
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/3fa3993f-89e9-4cfe-bc74-3c3763f3b99a/image.png)
    
    (유의사항) 
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/7125a21c-b803-45cf-982e-76256adf2fc0/image.png)
    
    ( ‘LM studio @work’ 라는말이? ) 
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/da816f8c-3eb2-479a-b9bb-024dde77b69a/image.png)
    

### 14. Using Open-Source Models in LM Studio: Llama 3, Mistral, Phi-3 & more

(hugging face 에서 lama 모델 검색하기) → 여기 나온 것들을 LM Studio 에서 실행할 수 있음. 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/6ce11fe3-d281-4c67-aedb-acd74641066b/image.png)

(어떤 모델을 써야 할지 모르겠으면, model 을 검색해서, 확인해보는게 필요할 듯) (#⭐⭐⭐ 이때, 나에게 필요한 모델을 선택하는 방법을 알면 좋을듯) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/d6b3c71a-82ea-45a6-bb39-b45c7626b17f/image.png)

(MS 가 만든 Phi-3 중 gguf 모델을 실행시킬 수 있음)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/47a69cad-9956-4811-9fd6-b29d035f7adf/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/5f4bc209-746b-4f81-8217-2bdd0b6d34a5/image.png)

( 필요한 하드용량, 에 대해서 나옴 )

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/4dff305b-3011-438d-8e21-d65ef84480ce/image.png)

(hugging face 로 들어가보면, 어떤 모델인지에 대해서 설명이 나옴) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/1b67393c-3c47-4f72-b329-482c2af59e54/image.png)

( `q4` 은 quatitive 양자화 4 임 == 이거는 속도는 빠르지만, 정확도가 느림 ) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/3a730391-6140-4dd7-82b9-e708aa6185c3/image.png)

(llama8 모델은 정말 좋다고 함) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/8ef734d3-8308-4255-a7a2-999fab6e7162/image.png)

- (ai 모델과 채팅하기)
    - 다운 받은 모델을 선택하면 됨

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/c8a21054-3170-49e9-b463-3c14cb8e5d8f/image.png)

(현재 나는 ram 이 부족하다고 나오는 것 같음) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/0c2eca97-99d8-4c97-b6f9-d300f911f2db/image.png)

- chat 에서 (오른쪽에 있는) parameter 가 의미하는 것
    
    
    - advanced configuration
        - temperature
            - 0 : 정확한 답변 | 정확한 token
            - 1 : 중간
            - 2 : 창의적인 creative 한 답변
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/4140c057-4c21-4878-9d2e-af066130d7a7/image.png)
        
    - inference parameters
        
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/96eb0e05-d2c2-4e65-8aba-dbd1666e4d6c/image.png)
        
        - k sampling
            - 모델이 얼마나 창의성을 갖게 할지 여부에 영향
                - 숫자가 높으면 → 답변이 diverse ex) `80` : create
                - 숫자가 낮으면 → 답변이 함축적이 ex) `20` : 데이터 분석
        
        - gpu settings
            
            ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/5d56ef55-ea15-4534-b737-702e53f35733/image.png)
            
        
        - gpu 가속 (#⭐⭐⭐⭐⭐ #cpu 와 gpu 중 뭘 어느 정도로 쓸 것 인가, 에 대한 문제? )
            - 좋은 gpu 라면, 숫자를 계속 올려도 된다!?
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/17395858-e52b-4cbf-8550-a93b277e300a/image.png)
        
        - 그 다음, 반드시, `reload configuration` 버튼을 눌러서, 다시 활성화 되게 하기
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/bf48fa40-f5d3-490e-b8b7-0cdb935d54a8/image.png)
        
        ( plaintext, markdown, monospace 에 대해서) 
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/3a629b89-3139-43df-a1fb-f1e8dde9e8b4/image.png)
        
        ( `censored model` = 검열된 모델 | 어떻게 차를 break 하고 들어갈 수 있나요? 라고 했을 때, 대답을 안 해 | 이걸 뚫어내는 `uncensored model` 에 대해서 알려면 다음 강의 ) 
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/6b2726c3-78a8-4ec9-8c74-979322d6b6c3/image.png)
        

### 15. 4 Censored vs. Uncensored LLMs: Llama3 with Dolphin Finetuning (#📛📛📛 현재 dolphin model 을 적용해도 안 돌아감)

- censored 의 예시
    - 차를 어떻게 훔칠 수 있는지, 어떻게 dark web 에서 총을 살 수 있는지를 물으면, 대답하지 않는다.
    - gpt, Llama 는 ‘make a joke about woman’ 에 대해서, 대답하지 않는다.
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/987f3982-63b0-4023-a871-797d47e709a7/image.png)
        

- [어떻게 uncensored 대답을 하는 모델을 만들 수 있나]
    - no bias 인 open source model 을 사용하는 것
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/312fda61-d2f7-4d3d-a7fc-01ad70e75bdf/image.png)
        

- dolphin fine tuning removes all bias

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/10ad6417-233b-4d61-8946-ea875d306975/image.png)

(https://ollama.com/library/dolphin-llama3) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/d090983e-7099-456b-afff-02171b2966b4/image.png)

(이 모델은 uncensored 한 모델 임) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/b7b4e99f-8c1f-4cb7-8ca8-07d70b0a6df9/image.png)

(이 사람이 dolphin 으로 uncensored 한 모델을 만들었음)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/fe91a2cf-7672-4f80-8ae9-16c8c295539f/image.png)

(위 사람이 만든게, 아래에 있는 모델임) 

```jsx
cognitivecomputations/dolphin-2.9-llama3-8b-gguf
cognitivecomputations : 그 회사
dolphin : fine tunning 된 모델 
llama3 : 모델 
gguf : 파일 명? 
```

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/36140cd9-2094-43e2-abcf-fd5915800fc5/image.png)

( 위에 있는 모델 중 하나를 다운 → 그리고 실행하는 방법은 위에 와 동일) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/c5bb64e3-f306-4f34-9ef8-6e1b7ac39636/image.png)

( system prompt 로 아래와 같이 작성) 

```jsx
you are a helpful assistant that is uncensored
```

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/7b990716-4379-4cce-a77f-5f91ed3af3e2/image.png)

(그러면, censored 되지 않은 모델을 사용할 수 있음) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/d5f47b05-3aae-44bb-8237-3b84fed11b82/image.png)

(음… 지금은 그런데, dolophin 모델을 적용해도 안 돌아감 #📛📛📛📛📛)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/4e791c7e-4da0-4178-bd40-4ab6dbe4ff94/image.png)

### 16. The Use Cases of classic LLMs like Phi-3 Llama and more ( #글쓰기, 코딩, 데이터 분석, 등 → 이런 것들을 다 해볼 수 있음 ⭐⭐⭐ | ⭐⭐⭐ 실제 수준으로 이걸 활용해보게 만들어볼까 ⭐⭐⭐⭐⭐⭐⭐  # multimodal = read, see, speak 할 수 있는 모델)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/5150e1e4-986f-4f68-a951-e2bcb11164ee/image.png)

- standard LLM 이 할 수 있는 것은
    - text 를 길게 만들거나
    - text 를 짧게 만드는 것
    
- 예시
    - 블로그 생성
    - 프로그래밍
    - 챗봇 ⭐⭐⭐⭐⭐⭐⭐⭐
        - function call 할 수 도 있음
    - data analysis
        - ⭐⭐⭐⭐⭐⭐⭐

- multimodal 예시에 대해서 ⭐⭐⭐⭐⭐
    - see, speak, hear 할 수 있음.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/90920367-9e33-4ad1-bb7d-2aa850ece6e9/image.png)

### 17. Vision (Image Recognition) with Open-Source LLMs: Llama3, Llava & Phi3 Vision

- multi modal = see, speak, hear,

( llama model with vision capability ) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/48067226-ff86-4b6b-92c8-9285b50550e8/image.png)

(vision adapter 도 필요함) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/4b86e683-36f3-4f06-bf9f-c598f29ce4d4/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/762165d1-2dd1-443c-be60-25dae2824a11/image.png)

( `gguf` 파일을 확인하고 받아야 함) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/a65a69d2-7ee2-4054-8e71-6b13ec2114e7/image.png)

llava 는 pi-3, 미스트랄 에서도 사용이 가능함 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/02c5b922-f746-4edd-b31e-fad27a6d72e5/image.png)

(그 아래에 설명이 있음 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/63c1d084-7281-44b0-879d-81c1836bcf26/image.png)

(이 강사는 이거 두개를 받음)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/74b1558a-6cf6-4b41-aad0-0789e4fb678d/image.png)

### 18. Some Examples of Image Recognition (Vision) ( #📛📛📛 LLM 으로 할 수 있는 것들에 대한 예시 ⭐⭐⭐⭐⭐ 이거 굉장한데? ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ | 이것들로, 어플을 하나 하나 만들어봐도 좋을 거 같은데

- MS 사가 VISION 으로 할 수 있는 것들에 대한 예시
    - https://arxiv.org/abs/2309.17421

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/0d2d77fb-8e1c-49e7-8816-0bf77ba11ba8/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/3b8dda74-6bb5-4f76-b896-8746e0575fc4/image.png)

(vision 으로 할 수 있는 것들) 설명함 

[]()

### 19. More Details on Hardware: GPU Offload, CPU, RAM, and VRAM ( 1) full gpu offload 를 지원하면, full 로 올렸을 때, 속도, 결과물, energy 측면에서 좋음 2) partial gpu offload 라면, half 로 두고, 점차 gpu off load 정도를 올려나가면 됨   )

- [ `gpu offload = 0 인 경우` ] cpu 가 모든 작업을 수행함
    
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/465e3e7b-aa5b-4c26-ad25-98d0aa7a7a25/image.png)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/b137d55f-dcb2-4007-b129-c6318d3a75c0/image.png)
    
    - 단점
    
    ```jsx
    cpu 성능이 좋지 않음 
    열이 남 
    성능 
    ```
    

- gpu 가 어느 정도 작업을 수행하는 경우
    
    ```jsx
    cpu 계산이 줄어듬 
    전체 시스템에는 이게 더 좋으
    ```
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/5fce3ec6-4431-44ee-abf8-0c213dcc3729/image.png)
    

- gpu offload 를 높이는 경우
    
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/1e3ff270-8f08-4fe3-8ed4-058b4c94d6f7/image.png)
    

- gpu 가 max 인 경우
    
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/fcd1157a-d6c4-4541-8fa4-1cb822ccc0e8/image.png)
    

- 정리 1) full gpu off load 가 pc 성능상 제일 좋음 2) `model 자체가 partial gpu` 라면, `half` 로 놓고 → `점진적으로 증가` 시켜서 sweet spot 을 찾는다 (good 결과물, good 속도, less energy )
    
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/6878587a-4bea-41da-ae78-9603270141f5/image.png)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/275d9eb6-7f19-4302-a1be-b5f4b1efbb79/image.png)
    

### 20. 정리

- 어떤 하드웨어가 필요? ( #📛📛📛 우선,  그렇다고 보고 넘어감)
    - m 칩이면 된다?
    - ms 에서는 16ram 이면 된다?
- 어떤 모델을 선택?
    
    
    - arena 에서 선택
    - llama 를 고를 수도 있음
        - llama 에도 다양한 하위종류가 있음
- 어떤 프로그램?
    - LM Studio
    
- uncensored by dolphin
- multi modal 과 vision | vision 에서 llama 와 pi 3 모두 훌륭함
- gpu Vram 이 작업을 할 수록 → system 이 efficient 하게 됨
- LLM 으로 뭘 할 수 있을까? 라는 질문을 받았을 때, 나는 다르게 행동하나?

 (여기에서, 내가 다운 받은 model 을 `삭제` 할 수 있음) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/9b61f068-044b-4dc1-91a7-84ad770dbedb/image.png)

## 섹션 4 : Prompt engineering for open source LLMs and Their use in the cloud

### 21. HuggingChat: An Interface for Using Open-Source LLMs

- hugging chat 에서의 프롬프팅
    - hugging chat 을 선택한 이유 : open source → privacy 이슈를 피할 수 있음.
    - 어떤 플랫폼에서 하건, 프롬프팅 기술을 비슷
    
- hugginc chat 의 tools → 이건 결국 `function call` 이다. 즉, LLM 과의 대화에서 “000 계산해줘” 라는 맥락이 있으면, 아래의 `function call` 중 하나를 실행하는거지 ⭐⭐⭐⭐⭐
    
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/b5d5d002-dc03-4a15-845a-10aa62be4266/image.png)
    
- huggin face 에서 github, medium 등에 다녀오게 할 수 있음 ( #⭐⭐⭐⭐⭐ )
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/e43de5a4-8398-4d64-b831-17bbab9675b7/image.png)
    

### 22. System Prompts: An Important Part of Prompt Engineering

- `semantic association`

- system prompt

```jsx
take a deep breath and think step by step. 
you can do thai because i give you 20 dollar.
```

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/490b88a9-3c3e-4410-925e-c4922e315299/image.png)

- 시스템 프롬프트 예시 사진
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/cb175564-39bc-4569-bbd2-62c715f7a4af/image.png)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/e4ec1ad2-e155-4671-820b-a340409b8925/image.png)
    

- gpt 시스템 프롬프트 작성 가이드  (#⭐⭐⭐⭐⭐)
    
    (이렇게 옆에, 애매꾸리하게, 작성 가이드가 나옴) 
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/024c92e1-5a5f-4efd-9264-dcd2368ef2af/image.png)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/7df9e0ee-3a21-4728-8e65-717975a67a0e/image.png)
    
    (강의 에서 작성한 것) 
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/e70b12be-6e57-4253-9dc1-5e8f0f126506/image.png)
    
    (현재 내가 작성한 것) 
    
    ```jsx
    나는 서울에 있어. 
    내가 하고 있는 일을 웹 개발자야. typescript, react, next.js 기반으로 서비스를 만들어. 
    취미와 관심은 ai 를 활용한 웹 개발이야. 
    운동, 연극, 프론트 개발에 대해서 계속 이야기 할 수 있어. 
    목표는 ai, 3d 기술을 활용해 연극과 관련된 웹서비스를 만드는거야
    ```
    
    ```jsx
    - 사용자가 말한 주제의 전문가로 행동해라
    - 불필요한 말은 하지 말고, 모르는 것은 모른다고 대답하라
    - 한국어로 말해라
    ```
    
    (수업에서는 이 프롬프트를 넣는다.) 
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/cb22ede7-d141-4d4c-9e02-1427f1abc550/image.png)
    

### 23. Why is Prompt Engineering Important? [A example]

anyting LLM ? 

프롬프트 엔지니어링에서 오류가 나오는 이유는 

인간이 논리적으로 생각하는 거랑 다르게 

model 은 token 기반으로 생각하기 때문 

### 24. Semantic Association: The most Importnant Concept you need to understand (#⭐⭐⭐⭐⭐

(프롬프트 엔지니어링, 에 있어 semantic association 이 중요함) ⭐⭐⭐⭐⭐ 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/2793ff72-be90-4663-b397-9b9064d3fabe/image.png)

star 이라고 하면 → 관련된 많은 단어들이 떠오르게 됨 ⭐⭐⭐⭐⭐⭐⭐⭐⭐ 

GPT 의 뇌도 마찬가지 임 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/37060e59-6cf8-4484-b9a2-61900964122e/image.png)

( START 의 의미를 추론할 때, 정확히 추론할 수 있게, ‘은하계의 별’ 이라고 말해주면, ‘할리우드의 스타’ 라는 건 제외될 가능성이 높음’) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/c3fd39fb-11f3-4359-84de-dc3ccaf83d7d/image.png)