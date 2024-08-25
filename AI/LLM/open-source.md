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

### 25. The structured Prompt: Copy my Prompts ( #구조화된 프롬프트의 가능성 - 1) 내 생각에 좋은 글, 잘 쓰여진 글이 있으면, 그걸 학습시켜서 나오게 한다. 2) 그 다음 변수화를 시킨다 3) 그래서 다양하게 만들 수 있다. 4) 어쩌면 사이트 자체를 동적으로 만들 수도 있지 않을까.

- 강의 교재
    
    
    [1+The+structured+Prompt.pdf](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/0c7763ed-ae4f-45d2-9021-750f20dc9616/1ThestructuredPrompt.pdf)
    
    Structured Prompt!
    A structured prompt consists of a (Modifier) + (Topic) + (Multiple Modifiers).
    These elements together form the optimized prompt.
    
    Modifier: Specifies the type of desired response. Examples: "Twitter thread,"
    "blog post," "research paper," etc.
    Topic: The main subject or question to be addressed in the response.
    Additional Modifiers: Additional specific requirements or details to be
    considered in the response. Examples: Target audience, keywords used, style,
    length, structure, etc.
    Example: Write a (blog post) about (healthy eating). Address it to (working
    professionals) and use keywords that are relevant for SEO. Write the text in a
    (simple, understandable style) so that it is easy to read and comprehend. The
    length should be (800 words), and the text should be well-structured.Analysis of the Example:
    • Modifier - Blog Post: Here, we are instructing the Language Model to create a
    more detailed and in-depth text, as opposed to short, concise tweets.
    • Topic - Healthy Eating: This is the main focus of our request.
    • Target Audience - Working Professionals: The model needs to present the
    information in a way that is practical and actionable for working professionals
    who may have limited time.
    • Use of Keywords - SEO Relevance: The model should incorporate keywords
    and phrases that can enhance visibility on search engines.
    • Style - Simple, Understandable Style: The model should make the text clear
    and comprehensible to facilitate easy reading.
    • Length and Structure - 800 Words, Well-Structured: These requirements help
    determine the length and formatting of the text.
    

- 구성 요소
    - modifier
        - type of desired response
        - ex) blog post, research paper
    
    - topic
        - The main subject or question to be addressed in the response
    
    - multiple modifier
        - Additional specific requirements or details to be considered in the response.
        - ex) Target audience, keywords used, style, length, structure, etc.
            - Targer audience 는 스타일 때문에 중요
            - ex ) 10살에게 써줘 vs 직장인에게 써줘 는 다름
        
- 전체 예시
    - Write a (blog post) about (healthy eating). Address it to (working
    professionals) and use keywords that are relevant for SEO. Write the text in a
    (simple, understandable style) so that it is easy to read and comprehend. The
    length should be (800 words), and the text should be well-structured.
    
    - Modifier
        - Blog Post: Here, we are instructing the Language Model to create a
        more detailed and in-depth text, as opposed to short, concise tweets
    - Topic
        - Healthy Eating: This is the main focus of our request.
    - Target Audience
        - Working Professionals: The model needs to present the
        information in a way that is practical and actionable for working professionals
        who may have limited time.
    - Use of Keywords
        - SEO Relevance: The model should incorporate keywords
        and phrases that can enhance visibility on search engines.
    - Style
        - Simple, Understandable Style: The model should make the text clear
        and comprehensible to facilitate easy reading.
    - Length and Structure
        - 800 Words, Well-Structured: These requirements help determine the length and formatting of the text.

- 예시에서 `( )` 괄호를 변경하면 → 다른 내용으로 나온다! ⭐⭐⭐⭐⭐⭐⭐⭐

```bash
Write a (blog post) about (healthy eating). Address it to (working
professionals) and use keywords that are relevant for SEO. Write the text in a
(simple, understandable style) so that it is easy to read and comprehend. The
length should be (800 words), and the text should be well-structured.
```

```bash
Write a (tweet thread) about (investing money). Address it to (newbies) and use keywords that are relevant for SEO. Write the text in a
(simple, understandable style) so that it is easy to read and comprehend. The
length should be (500 words), and the text should be well-structured.
```

```bash
Write a (tweet thread) about (investing money). Address it to (experts) and use keywords that are relevant for SEO. Write the text in a
(simple, understandable style) so that it is easy to read and comprehend. The
length should be (500 words), and the text should be well-structured.
```

- 궁금한 것
    - 그러면, 이 `잘 만들어진` 프롬프트를 어떻게 만들 수 있는거지
    - `잘 만들어진 프롬프트` 가 있으면 → 변수화를 해서 → 다양한 출력물을 낼 수 있는거네
    
    - 그러면
        1. 괜찮다고 생각하는 글을 분석해서 → 프롬프트로 만든다. 
        2. 내가 다르게 넣고 싶은 정보들을 넣으면 → `변수화` 가 되어서 → 다양한 출력물이, `내가 괜찮다고 생각하는 글 스타일` 대로 나온다. 
            
            ex) 사진, 관련 설명 등 
            
        
    

### 26. Instruction Prompting and some Cool Trick ( #[instruction prompting](https://learnprompting.org/) 에서 많은 프롬프팅 스킬 - 특히, task 빨리 끝내는 법, 같은 tip 도 있는 것 같음. 이거 최대한 활용하면 좋을 것 같은데  # step by step , take a deep breath (동기부여 차원) you can do it i pay 20 dollar)

- instruction prompting (funny 를 거꾸로 써 → 그럼, ynnuf 라고 반대로 쓴다.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/857ff601-f59d-482b-af91-8a183accc096/image.png)

- instruction prompting 에서 많은 프롬프팅 스킬 배울 수 있음
    - https://learnprompting.org/ ⭐⭐⭐⭐⭐⭐

- 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/1e259652-300e-4cd2-9ae3-97b7dc21282f/image.png)

### 27. Role Prompting for LLMs

- 역할 부여 한다는 건?
    - `핵심 키워드` 를 제시하는 것
    - 여기에서는 `셰익스피어`, `writer`, `poem`
    - 이게 중요한 이유는 의미론적 연관성(`symantic association`) 때문 ([https://www.notion.so/Open-source-LLMs-Uncensored-secure-AI-locally-with-RAG-98bddf23fc26496f9dc6a8b36dde15af?pvs=4#d3df4ef8bcf040e6988d0424dfebaf99](https://www.notion.so/Open-source-LLMs-Uncensored-secure-AI-locally-with-RAG-98bddf23fc26496f9dc6a8b36dde15af?pvs=21)) 여기 필기 참고

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/a9506ef3-d415-4f43-b2c5-1b119e030a02/image.png)

- 역할을 부여하면 좋은점?
    - 결과물이 더 좋음 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

### 28. Shot Prompting: Zero-Shot, One-Shot & Few-Shot Prompt ( # 좋은 예시 2~3개를 만들고 → 학습을 시켜서 → 비슷한 결과물을 낸다 → 이 프롬프팅을 구조화 해서 변수화 시킨다.)  (#⭐⭐⭐⭐⭐ 다만, 단순히, 따라해! 가 아니라 `고려해야 하는 구성 요소를 table 로 분류`해서 전달해야 한다고 생각한다. )

- Shot Prompting 이란?
    - 내가 좋아하는 것의 예시를 전달하는 것

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/3c41ed43-db85-491d-8dcf-0c5883d17357/image.png)

- [how 예시 프롬프팅] 좋은 예시 1개 제공

```bash
give me a description 이라고 프롬프트를 적음 

here is an example i like
	-> 여기에 좋아하는 것의 예시를 적음 

give me a similar description ⭐⭐⭐ 

```

- [how 예시 프롬프팅] 좋은 예시 2개 제공
    
    ```bash
    give me a description 이라고 프롬프트를 적음 
    
    here are a few examples i like
    	-> 여기에 좋아하는 것의 예시를 적음 
    	-> 2개 이상을 적음 
    
    give me a similar description ⭐⭐⭐ 
    
    ```
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/e74d8b00-1f77-4433-a7b0-1a472a3c6d4c/image.png)
    

- 블로그 포스팅 프롬프팅
    
    ```bash
    1. 블로그 포스팅 좋은 예시 2~3개 제공 
    2. 비슷하게 쓰라고 
    3. 의미론적 연관성! 
    ```
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/bdc2564e-3399-4c4c-aa64-8a651e577a96/image.png)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/060be666-c871-4f92-b69b-ff5ec1f753d4/image.png)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/483dff1e-5db3-4f7f-9dca-37bf200b010e/image.png)
    

### 29. Reverse Prompt Engineering and the "OK" Trick ( #⭐⭐⭐ 레퍼런스대로 만들려면 필요한 다른 기술 중 하나 #shot 과 같이 사용 #특정 개념을 먼저 제시하고, 그것에 대해 의미론적 연관성을 가진 상태에서 만든다는 점에서, 또 다름 # reverse engineering 뿐 아니라 다른 개념을 적용한 콘텐츠를 만들 수도 있을 것 임 #⭐⭐⭐⭐⭐)

- `Reverse Prompt Engineering` 예시 자료
    
    ```bash
    1. You Are a prompt Engineering pro for Large Langiage Models. Let's
    start with understanding Reverse Prompt Engineering. In this context, it
    means creating a prompt from a given text. You think to everything step
    by step because i give you 20 dollar. Please only reply with 'ok'.
    
    2. You are an expert in Reverse Prompt Engineering. Can you provide me
    with a simple example of this method?
    
    3. I would like you to create a technical template for Reverse Prompt
    Engineering. Do not hesitate to ask questions if you need more context.
    
    4. I would ask you to apply Reverse Prompt Engineering to the following
    [your text]. Make sure to capture the writing style, content, meaning,
    language, and overall feel of the text in the prompt you create.
    ```
    

1. You Are a prompt Engineering pro for Large Langiage Models(역할 부여). Let's
start with understanding Reverse Prompt Engineering. In this context, it
means creating a prompt from a given text(reverse prompt engineering 에 대한 개념 제시). You think to everything step by step because i give you 20 dollar(think of chain, 동기부여). Please only reply with 'ok'(토큰 절약 위해).

1. You are an expert in Reverse Prompt Engineering. Can you provide me
with a simple example of this method? (이건 그냥 사용해도 됨) 
    1. 예시 들어봐 라고 말함 → 의미론적 연관성이 생김 ⭐⭐⭐

1. I would like you to create a technical template for Reverse Prompt
Engineering. Do not hesitate to ask questions if you need more context. (이 단계가 핵심임 ⭐⭐⭐⭐⭐⭐) (다시 되돌아본다?) 
    1. better 의미론적 연관성을 만들기 위해, → template 를 요구 → best context 가 생김 ⭐⭐⭐

1. I would ask you to apply Reverse Prompt Engineering to the following
[your text]. Make sure to capture the writing style, content, meaning,
language, and overall feel of the text in the prompt you create
    1. 여기 `[your text]` 에, `따라하고 싶은 텍스트` 를 넣는다 ⭐⭐⭐⭐⭐ 

→ 이게 먹힌다면, 

reverse prompt engineering 이 전부가 아니라, 

다른 개념을 활용할 수도 있겠네 

### 30. Chain of Thought Prompting: Let`s think Step by Step (#⭐⭐⭐ 예시를 제시하면 → 문제를 더 잘 푼다. # 예시 코드를 제시하면, → 문제를 더 잘 풀겠지. # 이렇게 예시 코드를 제시할 수 있으려면, 내가 공부를 하고, ‘개념어’ 로 지정해두고, 이걸 기반으로 질문을 해야 겠네?! #그러면, 이 이슈는 어떤 것과 관련된 문제인지 생각해봐, 라는 질문을 던져야 할 수도 있겠다. ⭐⭐⭐)

- Chain of Thought Prompting
    - 내가 예시를 제시하거나
    - gpt 에게 예시를 요구하거나

- `예시` 를 제시하면 → 퀄리티가 더 좋아짐 ⭐⭐⭐⭐⭐
    - 예시 코드를 제시하면 → 더 좋아지겠네 ⭐⭐⭐⭐⭐
    - A 부분이 `어떻게 생각하면 되는지` 에 대한 예시를 제공

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/1a816a4e-a81f-4434-8c29-699fe6c8c5cb/image.png)

- chain of thought + step by step 사용 예시
    - 아마도 gpt 에게 예시를 생각하라고 한 버전

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/00fd5621-6f18-4776-85da-53e3725f89b0/image.png)

### 31. Tree of Thoughts (ToT) Prompting in LLMs ( #different output → what’s the best one → 반복 → final result #⭐⭐⭐ 아키텍처 설계를 할 때, 이 방식을 잘 사용해도 좋을거 같은데?!)

- 관련 paper

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/5522397e-22be-4962-9a6d-e2ba6b1d9745/image.png)

- 해당 솔루션에서 더 많은 솔루션

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/3a310b50-d506-421d-bd41-0819e56ebd32/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/77b10ac4-2562-460a-91f5-18f448c93d18/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/6026cb7d-3849-47e9-a17b-f42edf9531dd/image.png)

- 첫 번째 방식에 대해 다음의 결과를 얻음

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/c6cbd6e8-f954-4abb-a682-d2cfe220def6/image.png)

- 두 번째 프롬프팅

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/330c4427-47e3-4291-aa12-99a549f6ed1b/image.png)

- 세번째 프롬프팅

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/dc42dec9-8349-431d-9662-3ced4513c025/image.png)

- 정리 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
    - 첫 번째 프롬프팅
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/b24e1c75-0178-43d9-9e2a-9eb48b8b9b22/image.png)
    
    - 세가지 나온 결과중 무엇이 좋은지 평가한다.
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/86d3a40e-685a-470d-ad38-3f3cbef38efb/image.png)
    
    - 그 다음 다른 관점으로 이동
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/9c481ba6-c5ad-46f1-a370-3b7bdf9d4696/image.png)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/b4ddfe6c-e624-4663-b934-e2e6ba7bec79/image.png)
    
    different output → what’s the best one → 반복 → final result 
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/5a4a1317-3223-48f0-8f3c-3a00f969ed0a/image.png)
    

[4+Prompt+Generator.pdf](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/601e1130-d5fd-4991-a7c8-2f1d3fd8d1cf/4PromptGenerator.pdf)

[3+Prompt+Engineering+Framework.pdf](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/170c36b0-23d6-4a03-8c40-5b58aa103804/3PromptEngineeringFramework.pdf)

### 32. The Combination of Prompting Concepts ( #role 부여 → structured prompt → example 부여 → 약간의 magic word ) ( #⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 이렇게 기본적으로 물어보는게 굉장히 중요 )

[4+Prompt+Generator.pdf](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/601e1130-d5fd-4991-a7c8-2f1d3fd8d1cf/4PromptGenerator.pdf)

[3+Prompt+Engineering+Framework.pdf](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/170c36b0-23d6-4a03-8c40-5b58aa103804/3PromptEngineeringFramework.pdf)

- combine 에서 가장 중요한 건, 의미론적 연관성

- 예시 1
    - 트레이너 이름을 부여 → 의미론적 연관성! 을 부여 ㄴㄴ
- 예시 2 ( ⭐⭐⭐⭐⭐⭐)
    - role 부여
    - structured prompt
    - example 을 부여
    - 약간의 magic word

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/afad1638-2556-40ff-be64-8759557f888f/image.png)

### **33. Creating Your Own Assistants in HuggingChat ( #⭐⭐⭐⭐⭐⭐ 특정 url 을 부여할 수 있음 )**

https://huggingface.co/chat/assistants

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/8af1e8e8-0498-4c9d-bb0f-74076ab91daf/image.png)

(아래에 보면, 설정값이 있음) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/54eeddf4-6d72-4987-a262-d1f5a1f4c299/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/1dc38f2b-33c1-4e0f-8793-7421840b17e3/image.png)

(https://huggingface.co/chat/settings/assistants/new) 여기 임 ⭐⭐⭐⭐⭐ 

(셋팅항목에서 Link 를 제공할 수 있음 → 그러면, github 을 연결할 수 있음) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/bb15bf24-cc96-45da-b18f-1be44d61c45c/image.png)

---

### 34. grok ( #⭐⭐⭐⭐⭐ 라마3 를 사용해도, 출력되는 결과물이 진짜 빠름 # 빠른다는게 장점 # 대신 open source 의 퀄리티를 믿을 수 있는가의 문제 #open source 를 쓴다면 grok)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/9f7ae776-3318-4af5-a728-2293178607da/image.png)

### 35. 요약

- 오픈 소스를 쓴다면 grok 이 빠름 . 허깅chat 도 있음

- 프롬프트
    - 시스템 프롬프트
    - 일반 프롬프트
        - 프롬프트 엔지니어링
            - 의미론적 연관성 ⭐⭐⭐

- 더 나은 결과물을 얻으려면 ⭐⭐⭐⭐⭐
    - assistant 설정
    - 시스템 프롬프트
    - 일반 프롬프트를 결합

### 36. What Will Be Covered in This Section?

- RAG 어플리케이션 만들 때 필요한 요소
    - fucntion calling
    - vector databases
    - embedding models
    
- make a server with LM Studio
- connect these two pieces
- Ohama

- 이 수업이 지나면 RAG agent 가 생김
    - api 활용한 외부 검색
    - privacy 보호 데이터

### 37. What is Function Calling in LLMs ( # LLM 은 하나의 operating system 으로써 기능 → so, 특정 task 를 잘 수행하지 못 할 경우, `사진 찍기` , `그림 그리기` 처럼, 이미 잘 만들어진 function 을 호출해서 수행하게 함. 그러면, LLM 은 ‘A 상황에서 → B 함수를 호출’ 하게 하는 역할만 함 ( #즉, LLM 은 `operating sysmtem` 이고. `specific task` 는 function 으로 call 한다. ⭐⭐⭐)

- LLM 은 `operating system` ⭐⭐⭐⭐⭐
- LLM 은 `specific task` 를 잘 수행하지는 못 함.
    - ex) 계산, 사진 찍기 등
    - LLM 은 이 특정 TASK 를 ‘호출’ 하는 역할을 함 ⭐⭐⭐
    - ex) diffusion model 에 그림 그리는 요청을 하고, 답변을 받음

(파일 시스템에서 읽어들일 수도 있음) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/1ed68828-6929-4d57-b17f-5b67b1c3b1fa/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/1f60703d-1790-4438-82a8-7888fbae9f3a/image.png)

function call 을 사용해서 계산하게 되는 경우 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/dffeda92-5e97-4ffd-91e9-b478ff34185c/image.png)

### 38. Vector Databases, Embedding Models & Retrieval-Augmented Generation (RAG) ( 1) `파일` 이 들어옴 2) 파일은 `임베딩` 을 거침 3) 그 결과 `token` 이 만들어짐 4) 토큰은 `cluster` 형태로 vectorDB 에 어장이 됨 5) 사용자가 `LLM` 에게 질문을 함 6) LLM 은 vectorDB 에 있다면, 정확히 해당 클러스터에서 답을 가져옴 7) 만약, vector DB 에 없다면, 그렇지 않음 8) 이 과정은 클럽에서 아빠 혹은 엄마가 자식을 찾는 것 처럼 자연스럽게 이루어짐

- LLM 에 지식을 추가하는 법
    - context learning
        - 프롬프트 엔지니어링으로
    - direcct technology
    - etc
        - fine tunning

- vector database, embedding 에 대한 이해
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/71a5120a-0051-4d0c-bbb3-312d1586ccb2/image.png)
    

- context window 에 너무 많은 token 이 있으면 LLM 은 이해하지 못 함
    - 이걸 해결하는게 direct technology

```bash
file 을 올림
file 이 vector database 에 저장됨 
embedding model 는 파일을 vector 로 만듦 
vector 로 변환된 것에 대해 우리는 search query 를 할 수 있음. 
```

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/80dfc218-4990-4d82-9adc-805037d0924d/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/74dd6a61-9f1d-4201-b57d-251069db5d6c/image.png)

( 출처 : https://blogs.nvidia.com/blog/what-is-retrieval-augmented-generation/) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/02974e51-6670-433d-a2ac-ee599733d66d/image.png)

```bash
[1-저장하는 관점]
vector DB 에 저장 하려면, embedding model 을 사용해야 함

[2-유저가 사용하는 관점]
user 가 query 를 날림 
embedding model 로 들어감 
embedding model 을 거쳐서 vector db 로 갈 수 있음. 
vector db 에서 해당되는 데이터를 갖고 옴? 
LLM 은 VectorDB 에서 데이터를 찾아옴
```

- (CF. 임베딩 = `자연어` 를 `벡터` 로 변환 한 결과 혹은 과정)
    - 데이터를 `끼워넣으면` → 기계가 이해할 수 있는 벡터로 변환

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/6ea8dd44-2917-40ac-aef8-d135b2fa337f/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/df1903f8-34a5-422f-bc1b-a3e422642387/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/58525786-c983-4047-9f26-8b4a599e0435/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/3493e140-eaad-43a2-a335-ec38bc6a1225/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/8884e16b-fc16-4a4d-9818-5e80b87c55fd/image.png)

### 1차 설명

pdf 가 들어옴 (csv 등의 파일)

pdf 는 `임베딩` 을 거쳐서 → `벡터` 로 저장이 됨 (`token` 을 만듦) 

벡터 DB 는 `cluster` 로 구성됨 

0.2 ~ 0.4 사이의 값이 저장되는 cluster

1 ~ 2 사이의 값이 저장되는 cluster 가 존재함

동일 cluster 에는 `비슷한 부류`들 이 들어감 ex) 과일, 동물 등등 (⭐⭐⭐ 이게 중요) 

벡터 DB 에서는 어떻게 이렇게 작동하는가? 

파티에서 1) 댄스 플로어 2) 맥주 BAR 3) NERDS 그룹이 모여있는 곳이 있음 

`걸` 들은 `댄스플로어` 에 있음 

그러니, 벡터 DB 에서 , 걸들을 그곳에서 찾는다. 

사용자가 `QUERY 를 요청`하면, `LLM` 은 해당 쿼리를 `어디에서 찾아야 하는지 정확히` 안다. ex) 아빠가 딸을 댄스플로어에서 찾는 것 처럼 

### 2차 설명

`파일` 이 들어옴 

파일은 `임베딩` 을 거치고 → `token` 이 만들어짐

`token` 은 vectorDB 에 `클러스터` 형태로 저장됨

LLM 에게 질문을 하면

만약 필요하다면(vector DB 에 있다면, function call 을 한다.) → `LLM` 은 `function calling` 을 통해 vectorDB 안에, 정확히 어디를 검색하면, 알 수 있는지를 알고 있음. 마치 클럽에서 딸을 찾는 아빠 처럼.  (#⭐ 이 검색의 주체가 LLM 이라는 것 #이때, `specific task` 이므로, `function-calling` 이 사용된다는 것. ) (# 이게 function calling with direct technology) 

vector DB 에 저장되어 있지 않다면, function call 을 하지 않는다. ( #⭐⭐⭐⭐⭐) 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/ec572c02-eb31-4f8c-8e77-78ea2466e1e1/image.png)

---

LM 스튜디오로 서버를 만드는구나 

그리고 이걸 anything LLM 에 연결해주는 구나 

RAG 파이프라인 

악, GITHUB repository 를 연결 할 수 있구나 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/783cc112-0b05-4cf4-9046-34aeb2d15b4a/image.png)


---

# 내가 해야 하는 것

- 쓰고 싶은 코드, 쓰고 싶은 글이 있음. 이걸 학습 시키는 것
    - ex) 마케팅 카피를 쓰는 prompt 를 판매 한다.
    - 사이트 분석을 한다.
    - 회원의 행동 유형을 분석한다.
    - 더 고도화된 prompt 를 만든다.
- 이 학습된 걸 기반으로 output 을 내뱉게 하는 것

- 코드를 내뱉게 하는 것
    - https://learnprompting.org/courses/boost-your-day-to-day-efficiency-with-generative-ai
    - 혹은 LLMs? RAG?
        - 이거 관련된 udemy?
        - anything LLM 키워드로?