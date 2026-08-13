import { useEffect, useState } from 'react'
const portrait = 'https://raw.githubusercontent.com/ronaelmoura/ronaelmoura.github.io/main/assets/ronael-moura.webp'

const links = [
  ['Ronas Desk', 'ronas-desk'], ['Sobre', 'sobre'], ['Stack', 'stack'],
  ['Processo', 'processo'], ['Jornada', 'jornada'], ['Contato', 'contato'],
]

const features = [
  { icon: '01', title: 'Operação de chamados', text: 'Prioridade, categoria, responsável, status, busca, filtros, ordenação e paginação.' },
  { icon: '02', title: 'SLA e indicadores', text: 'Primeira resposta, tempo de resolução, prazos e métricas filtradas por período.' },
  { icon: '03', title: 'Histórico e auditoria', text: 'Comentários, linha do tempo e registro rastreável das mudanças de cada chamado.' },
  { icon: '04', title: 'Portal do cliente', text: 'Experiência dedicada para acompanhar solicitações, interagir e avaliar o atendimento.' },
  { icon: '05', title: 'Segurança aplicada', text: 'JWT, rotas protegidas, rate limit, perfis de acesso e demonstração somente leitura.' },
  { icon: '06', title: 'Anexos e notificações', text: 'Imagens e PDFs privados via Cloudinary, além de alertas conectados ao fluxo.' },
]

const roadmap = [
  { version: '01', state: 'Produto', title: '19 sprints concluídas', text: 'Evolução incremental da base operacional até portal, SLA, relatórios, auditoria e automações.', active: true },
  { version: '02', state: 'Engenharia', title: 'Arquitetura ponta a ponta', text: 'React no cliente, API REST em camadas, regras no backend e persistência relacional.' },
  { version: '03', state: 'Produção', title: 'Deploy validado', text: 'Aplicação conteinerizada no Render, MySQL no Aiven com TLS e anexos no Cloudinary.' },
]

const techGroups = [
  { eyebrow: 'Interface', icon: '◫', title: 'Front-End', text: 'Experiências rápidas, acessíveis e responsivas.', items: ['React', 'Vite', 'JavaScript', 'HTML5', 'CSS3'] },
  { eyebrow: 'Serviços', icon: '⌁', title: 'Back-End', text: 'APIs organizadas e regras de negócio bem definidas.', items: ['Node.js', 'Express', 'REST API', 'JSON', 'npm'] },
  { eyebrow: 'Persistência', icon: '◉', title: 'Dados & Qualidade', text: 'Dados consistentes, migrações e validação automatizada.', items: ['MySQL', 'SQL', 'Node Test Runner', 'ESLint', 'Oxlint'] },
  { eyebrow: 'Entrega', icon: '⌘', title: 'Cloud & Workflow', text: 'Da ideia ao software publicado, seguro e versionado.', items: ['Docker', 'Nginx', 'Render', 'Aiven', 'Cloudinary'] },
]

const process = [
  ['01', 'Planejamento', 'Entendo o problema, o usuário e o resultado esperado.'],
  ['02', 'Arquitetura', 'Defino dados, componentes, integrações e responsabilidades.'],
  ['03', 'Desenvolvimento', 'Construo em ciclos pequenos, claros e rastreáveis.'],
  ['04', 'Testes', 'Valido fluxos, erros, responsividade e casos importantes.'],
  ['05', 'Code Review', 'Reviso legibilidade, consistência e oportunidades de simplificar.'],
  ['06', 'Git', 'Registro a evolução com commits objetivos e histórico organizado.'],
  ['07', 'Deploy', 'Publico, verifico o ambiente real e acompanho a entrega.'],
  ['08', 'Melhoria contínua', 'Coleto aprendizados e evoluo produto, código e processo.'],
]

function Arrow() { return <span aria-hidden="true">↗</span> }

function EngineeringLab() {
  const [active, setActive] = useState(0)
  const [running, setRunning] = useState(true)
  const stages = [
    ['01', 'Problema', 'Entender o que realmente trava a operação.'],
    ['02', 'Sistema', 'Desenhar dados, fluxo e responsabilidades.'],
    ['03', 'Validação', 'Testar o caminho principal e os casos de erro.'],
    ['04', 'Produção', 'Publicar, medir e evoluir com responsabilidade.'],
  ]
  return <section className="engineering-lab reveal visible" aria-label="Laboratório interativo de engenharia">
    <div className={`lab-orbit ${running ? 'running' : ''}`} aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
    <div className="lab-top">
      <div><span className="lab-kicker"><i /> RONAEL.OS / BUILD MODE</span><h2>Não é uma animação.<br /><em>É meu jeito de construir.</em></h2></div>
      <button onClick={() => setRunning(value => !value)} className="lab-toggle" type="button">{running ? 'Pausar sistema' : 'Rodar sistema'} <span>{running ? 'Ⅱ' : '▶'}</span></button>
    </div>
    <p className="lab-instruction">Interaja com as etapas. Cada uma revela como uma ideia vira software pronto para uso.</p>
    <div className="lab-stages">
      {stages.map(([number, title, text], index) => <button className={active === index ? 'active' : ''} onClick={() => setActive(index)} key={number} type="button"><span>{number}</span><b>{title}</b><p>{active === index ? text : 'Clique para explorar.'}</p><i>↗</i></button>)}
    </div>
    <div className="lab-status"><span><i /> {running ? 'SISTEMA ATIVO' : 'SISTEMA PAUSADO'}</span><p>O Ronas Desk é a prova concreta deste ciclo: da ideia à produção.</p></div>
  </section>
}

function RecruiterAI() {
  const answers = {
    'Segurança': 'No Ronas Desk, autenticação JWT, permissões por perfil, Helmet, rate limit no login e uma conta demo somente leitura protegem os fluxos principais.',
    'Testes': 'O backend possui 122 testes automatizados. Eles validam regras, autenticação, rotas e cenários importantes antes do deploy.',
    'Arquitetura': 'A aplicação separa interface React, API REST Express, regras de negócio, MySQL com TLS, anexos privados no Cloudinary e deploy com Docker.',
    'Decisão difícil': 'Escolhi tratar a demo como ambiente somente leitura. Assim um recrutador consegue explorar o produto sem expor credenciais nem alterar dados.',
  }
  const [question, setQuestion] = useState('Segurança')
  const [visible, setVisible] = useState(false)
  useEffect(() => { setVisible(false); const id = setTimeout(() => setVisible(true), 130); return () => clearTimeout(id) }, [question])
  return <section className="recruiter-ai reveal visible" id="ai">
    <div className="ai-head"><div><p className="eyebrow"><span /> ASSISTENTE LOCAL / SEM API</p><h2>Pergunte ao <em>Ronas Desk.</em></h2><p>Um guia de avaliação técnica criado a partir das decisões reais do projeto.</p></div><span className="ai-online"><i /> ONLINE</span></div>
    <div className="ai-console"><div className="ai-prompts">{Object.keys(answers).map(item => <button className={question === item ? 'active' : ''} key={item} type="button" onClick={() => setQuestion(item)}>{item}</button>)}</div><div className="ai-terminal"><small>recruiter@portfolio:~$ pergunta sobre {question.toLowerCase()}</small><p className={visible ? 'typed' : ''}>{answers[question]}</p><div><a href="https://github.com/ronaelmoura/ronas-desk" target="_blank" rel="noreferrer">Ver evidência no código ↗</a><a href="https://ronas-desk.onrender.com/" target="_blank" rel="noreferrer">Testar demonstração ↗</a></div></div></div>
  </section>
}

function IncidentSimulator() {
  const incidents = [
    {
      id: 'login',
      label: 'Tentativas de login',
      title: 'Muitas tentativas falhas',
      intro: 'O sistema precisa proteger a conta sem deixar o usuário sem orientação.',
      result: 'A tentativa é bloqueada de forma controlada. A conta não é exposta e a API responde com um estado seguro.',
      flow: [
        ['Interface', 'Mostra feedback claro e evita ações duplicadas.'],
        ['API Express', 'Recebe POST /api/auth/login e aplica a validação.'],
        ['Segurança', 'Rate limit por IP: até 5 tentativas em 15 minutos.'],
        ['Dados', 'Senha é comparada com bcrypt; nenhum hash retorna ao cliente.'],
        ['Qualidade', 'Fluxos de autenticação são validados pelos testes do backend.'],
      ],
    },
    {
      id: 'sla',
      label: 'SLA em risco',
      title: 'Chamado perto do prazo',
      intro: 'A equipe precisa enxergar prioridade, prazo e responsável antes de perder o SLA.',
      result: 'O dashboard transforma o estado operacional em sinal de decisão: prazo, primeira resposta e tempo de resolução.',
      flow: [
        ['Interface', 'Filtra chamados e destaca prioridade, status e responsável.'],
        ['API Express', 'Organiza os dados do dashboard e dos relatórios por período.'],
        ['Regra de negócio', 'Calcula SLA, primeira resposta e tempo médio de resolução.'],
        ['Dados', 'MySQL mantém chamados, comentários, datas reais e histórico.'],
        ['Qualidade', 'Indicadores são tratados como parte do fluxo, não como enfeite.'],
      ],
    },
    {
      id: 'attachment',
      label: 'Anexo sensível',
      title: 'Documento precisa ficar privado',
      intro: 'Um PDF ou imagem de chamado não deve virar um link público permanente.',
      result: 'O arquivo fica protegido: acesso depende de sessão válida e o link de download tem duração limitada.',
      flow: [
        ['Interface', 'Exibe anexos apenas no contexto do chamado autorizado.'],
        ['API Express', 'Valida sessão e permissão antes de liberar o download.'],
        ['Segurança', 'Rotas protegidas e demonstração somente leitura evitam alterações indevidas.'],
        ['Dados', 'MySQL armazena metadados; o arquivo fica em ativo autenticado.'],
        ['Infraestrutura', 'Cloudinary gera URL temporária depois da autorização.'],
      ],
    },
  ]
  const [selected, setSelected] = useState(0)
  const [running, setRunning] = useState(false)
  const incident = incidents[selected]
  useEffect(() => { setRunning(false); const id = setTimeout(() => setRunning(true), 110); return () => clearTimeout(id) }, [selected])
  return <section className="incident-simulator reveal visible" aria-label="Simulador de incidente do Ronas Desk">
    <div className="simulator-head"><div><p className="eyebrow"><span /> SIMULADOR DE INCIDENTE / RONAS DESK</p><h2>Veja o produto <em>pensar em produção.</em></h2><p>Escolha uma situação e acompanhe como as camadas do sistema respondem.</p></div><span className="simulator-badge"><i /> DADOS FICTÍCIOS</span></div>
    <div className="incident-tabs" role="tablist" aria-label="Cenários de incidente">{incidents.map((item, index) => <button key={item.id} onClick={() => setSelected(index)} className={selected === index ? 'active' : ''} type="button" role="tab" aria-selected={selected === index}><span>0{index + 1}</span>{item.label}</button>)}</div>
    <div className={`incident-board ${running ? 'running' : ''}`}>
      <aside className="incident-source"><span>INCIDENTE DETECTADO</span><strong>{incident.title}</strong><p>{incident.intro}</p><i>↓</i></aside>
      <div className="incident-flow">{incident.flow.map(([layer, detail], index) => <article key={layer} style={{ '--delay': `${index * 90}ms` }}><span>{String(index + 1).padStart(2, '0')}</span><div><small>{layer}</small><p>{detail}</p></div><i>→</i></article>)}</div>
      <div className="incident-result"><span><i /> RESULTADO</span><p>{incident.result}</p><a href="https://github.com/ronaelmoura/ronas-desk" target="_blank" rel="noreferrer">Abrir implementação ↗</a></div>
    </div>
  </section>
}

function RecruiterMode({ onClose }) {
  const [step, setStep] = useState(0)
  const slides = [
    ['01 / QUEM É', 'Ronael Moura', 'Desenvolvedor Full Stack que transforma problemas operacionais em software web pronto para uso.', 'React · Node.js · Express · MySQL'],
    ['02 / PROVA', 'Ronas Desk v1.0', 'Produto de Help Desk em produção, com clientes, chamados, SLA, auditoria, anexos e Portal do Cliente.', '19 sprints · 122 testes · demo online'],
    ['03 / ENGENHARIA', 'Da interface ao deploy', 'Constrói fluxo completo: experiência, API, regras de negócio, dados, segurança, testes e infraestrutura.', 'Docker · Render · Aiven TLS · Cloudinary'],
    ['04 / PRÓXIMO PASSO', 'Vamos conversar?', 'Aberto a uma oportunidade para contribuir em um time que entrega produtos com impacto real.', 'GitHub · LinkedIn · E-mail'],
  ]
  const slide = slides[step]
  return <div className="recruiter-mode" role="dialog" aria-modal="true" aria-label="Modo recrutador">
    <div className="recruiter-mode-shell">
      <div className="mode-bar"><span><i /> MODO RECRUTADOR / 60 SEGUNDOS</span><button onClick={onClose} type="button" aria-label="Fechar modo recrutador">Fechar ×</button></div>
      <div className="mode-progress">{slides.map((_, index) => <i className={index <= step ? 'active' : ''} key={index} />)}</div>
      <main className="mode-content"><small>{slide[0]}</small><h2>{slide[1]}</h2><p>{slide[2]}</p><strong>{slide[3]}</strong></main>
      <div className="mode-actions">
        <button type="button" onClick={() => setStep(value => Math.max(0, value - 1))} disabled={step === 0}>← Voltar</button>
        {step < slides.length - 1 ? <button className="mode-next" type="button" onClick={() => setStep(value => value + 1)}>Próxima prova →</button> : <div><a href="https://github.com/ronaelmoura/ronas-desk" target="_blank" rel="noreferrer">Código ↗</a><a href="mailto:ronaelmoura240@gmail.com">E-mail ↗</a></div>}
      </div>
    </div>
  </div>
}

function Header({ openRecruiterMode }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <header className={`header ${scrolled ? 'scrolled' : ''}`}>
    <div className="nav-wrap">
      <a className="brand" href="#inicio" aria-label="Ronael Moura - inicio"><span>RONAEL <strong>MOURA</strong></span></a>
      <nav className="nav-desktop" aria-label="Navegação principal">
        {links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <button className="nav-cta recruiter-trigger" onClick={openRecruiterMode} type="button">Modo recrutador <Arrow /></button>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
        <span /><span /><span />
      </button>
    </div>
    <nav className={`nav-mobile ${open ? 'open' : ''}`} aria-label="Navegação móvel">
      {links.map(([label, id]) => <a key={id} onClick={() => setOpen(false)} href={`#${id}`}>{label}</a>)}
    </nav>
  </header>
}

function SectionHead({ tag, title, text }) {
  return <div className="section-head reveal">
    <p className="eyebrow"><span />{tag}</p><h2>{title}</h2>{text && <p className="section-lead">{text}</p>}
  </div>
}

function App() {
  const [recruiterMode, setRecruiterMode] = useState(false)
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
    }), { threshold: .1 })
    targets.forEach(target => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <div className="ambient" aria-hidden="true" />
    <Header openRecruiterMode={() => setRecruiterMode(true)} />
    <main id="conteudo">
      <section className="hero" id="inicio">
        <div className="hero-grid">
          <div className="hero-copy reveal visible">
            <div className="status-pill"><i /> Disponível para oportunidades</div>
            <p className="eyebrow"><span /> DESENVOLVEDOR FULL STACK</p>
            <h1>Eu transformo <em>problemas reais</em> em software que funciona.</h1>
            <p className="hero-lead">Sou <strong>Ronael Moura</strong>. Construo aplicações completas com React, Node.js e uma visão prática de produto — da arquitetura ao deploy.</p>
            <div className="actions">
              <a className="button primary" href="#ronas-desk">Conhecer o Ronas Desk <Arrow /></a>
              <a className="button secondary" href="https://github.com/ronaelmoura" target="_blank" rel="noreferrer">Ver GitHub <Arrow /></a>
            </div>
            <div className="proof">
              <div><strong>670h</strong><span>Formação Full Stack</span></div>
              <div><strong>122 testes</strong><span>Backend validado</span></div>
              <div><strong>v1.0 online</strong><span>Produto entregue</span></div>
            </div>
          </div>
          <div className="hero-art reveal visible">
            <div className="portrait-frame">
              <span className="frame-label">RONAEL MOURA</span>
              <img src={portrait} alt="Ronael Moura, Desenvolvedor Full Stack" width="1100" height="1100" />
              <div className="code-card"><i /> <span>LIVE IN PRODUCTION</span><strong>Ronas Desk v1.0</strong></div>
              <div className="stack-float"><span>REACT</span><b>+</b><span>NODE.JS</span></div>
              <div className="signal-console" aria-label="Fluxo de construcao de software">
                <div><span className="signal-live" /> SISTEMA DE CONSTRUCAO</div>
                <p><b>01</b> entender <i>-&gt;</i> <b>02</b> construir <i>-&gt;</i> <b>03</b> validar <i>-&gt;</i> <b>04</b> publicar</p>
              </div>
            </div>
          </div>
        </div>
        <a className="scroll-cue" href="#ronas-desk"><span /> Explore o projeto principal</a>
      </section>

      <div className="container"><EngineeringLab /><RecruiterAI /><IncidentSimulator /></div>

      <section className="project-hero" id="ronas-desk">
        <div className="container">
          <div className="project-heading reveal">
            <div><p className="eyebrow"><span /> CASE PRINCIPAL · V1.0 EM PRODUÇÃO</p><h2>Ronas <em>Desk</em></h2></div>
            <p>Uma plataforma Full Stack de Help Desk que centraliza clientes, equipe, chamados, SLA e indicadores em uma operação segura e rastreável.</p>
          </div>
          <div className="desk-showcase reveal">
            <div className="app-window">
              <div className="window-bar"><div><i /><i /><i /></div><span>app.ronasdesk.local/dashboard</span><small>● Seguro</small></div>
              <div className="app-layout">
                <aside><div className="app-logo">R<span>D</span></div>{['▦', '◫', '◎', '▤', '⚙'].map((x,i)=><b className={i===0?'active':''} key={i}>{x}</b>)}</aside>
                <div className="dashboard">
                  <div className="dash-top"><div><small>VISÃO GERAL</small><h3>Central de suporte</h3></div><button>+ Novo chamado</button></div>
                  <div className="dash-stats"><div><span>Total</span><strong>48</strong><i>+12%</i></div><div><span>Em aberto</span><strong>12</strong><i>Agora</i></div><div><span>Em andamento</span><strong>08</strong><i>Ativos</i></div><div><span>Concluídos</span><strong>28</strong><i>58%</i></div></div>
                  <div className="dash-bottom"><div className="chart"><span>Chamados da semana</span><div className="bars">{[38,58,42,76,64,92,55].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div></div><div className="recent"><span>Atividade recente</span>{['Falha no acesso', 'Configurar estação', 'Atualização concluída'].map((x,i)=><p key={x}><i className={`priority p${i}`} />{x}<small>{i+1}h</small></p>)}</div></div>
                </div>
              </div>
            </div>
            <div className="showcase-copy">
              <span className="version">ESTÁVEL · v1.0.0</span>
              <h3>Da ideia ao deploy.<br />Um produto completo.</h3>
              <p>Desenvolvi o Ronas Desk para demonstrar domínio do ciclo inteiro de software: experiência do usuário, API, regras de negócio, banco de dados, segurança, testes e produção.</p>
              <ul><li>19 sprints concluídas e fluxos validados</li><li>122 testes automatizados aprovados no backend</li><li>MySQL com TLS e migrações versionadas</li><li>Docker, Nginx, Render, Aiven e Cloudinary</li></ul>
              <div className="project-actions"><a className="button primary" href="https://ronas-desk.onrender.com/" target="_blank" rel="noreferrer">Testar demonstração <Arrow /></a><a className="text-link" href="https://github.com/ronaelmoura/ronas-desk" target="_blank" rel="noreferrer">Ver código <Arrow /></a></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section features">
        <div className="container"><SectionHead tag="PRODUTO EM FUNCIONAMENTO" title="Uma operação de suporte completa. Não apenas telas." text="Cada módulo se conecta às regras do negócio, preserva o histórico e respeita as permissões do usuário." />
          <div className="feature-grid">{features.map((item, index) => <article className="feature-card reveal" key={item.title}><div><span>{item.icon}</span><i>0{index+1}</i></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </div>
      </section>

      <section className="section roadmap-section">
        <div className="container"><SectionHead tag="DO PROBLEMA À PRODUÇÃO" title="O que este projeto comprova na prática." />
          <div className="roadmap reveal">{roadmap.map(item => <article className={item.active ? 'active' : ''} key={item.version}><div className="road-dot" /><div className="road-meta"><strong>{item.version}</strong><span>{item.state}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          <p className="road-note reveal">A demonstração usa dados fictícios e um perfil somente leitura, permitindo avaliar o produto sem expor credenciais administrativas ou dados reais.</p>
        </div>
      </section>

      <section className="section about" id="sobre">
        <div className="container about-grid">
          <div className="about-title reveal"><p className="eyebrow"><span /> SOBRE MIM</p><h2>Técnica para construir.<br /><em>Curiosidade para evoluir.</em></h2></div>
          <div className="about-copy reveal"><p className="large">Sou Desenvolvedor Full Stack e transformo problemas operacionais em <strong>produtos web claros, seguros e prontos para uso.</strong></p><p>Minha experiência em suporte de TI me ensinou a ouvir o usuário, investigar causas e assumir responsabilidade pela solução. Hoje aplico esse raciocínio em interfaces, APIs, bancos de dados e deploy.</p><p>Com o <strong>Ronas Desk</strong>, levei uma ideia por 19 sprints até a versão 1.0 em produção. Na <strong>Ronas Tech</strong>, continuo desenvolvendo soluções digitais e compartilhando aprendizados reais.</p>
            <div className="about-links"><a href="https://www.linkedin.com/in/ronael-moura" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="https://github.com/ronaelmoura" target="_blank" rel="noreferrer">GitHub <Arrow /></a></div>
          </div>
        </div>
      </section>

      <section className="section stack" id="stack">
        <div className="container"><SectionHead tag="TECNOLOGIAS" title="Uma stack moderna para produtos completos." text="Ferramentas escolhidas para criar soluções úteis, legíveis e prontas para evoluir." />
          <div className="tech-grid">{techGroups.map(group => <article className="tech-card reveal" key={group.title}><div className="tech-icon">{group.icon}</div><small>{group.eyebrow}</small><h3>{group.title}</h3><p>{group.text}</p><div>{group.items.map(x=><span key={x}>{x}</span>)}</div></article>)}</div>
        </div>
      </section>

      <section className="section process-section" id="processo">
        <div className="container"><SectionHead tag="COMO EU DESENVOLVO SOFTWARE" title="Processo claro. Decisões conscientes. Evolução contínua." />
          <div className="process-grid">{process.map(([n,title,text])=><article className="process-card reveal" key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="section journey" id="jornada">
        <div className="container"><SectionHead tag="MINHA JORNADA" title="Da curiosidade ao desenvolvimento de produtos reais." text="Uma trajetória construída entre formação, suporte, prática constante e compartilhamento de conhecimento." />
          <div className="journey-grid reveal">
            <div className="journey-line" />
            <article><span>01</span><small>BASE TÉCNICA</small><h3>Suporte em TI</h3><p>Manutenção de computadores, atendimento a usuários e solução de problemas: a base para entender tecnologia pela perspectiva de quem usa.</p></article>
            <article><span>02</span><small>FORMAÇÃO</small><h3>Full Stack no SENAI</h3><p>670 horas de formação, conceito final APTO e fundamentos sólidos de front-end, back-end, APIs, banco de dados, testes e versionamento.</p></article>
            <article><span>03</span><small>CONSTRUÇÃO PÚBLICA</small><h3>PortfÃ³lio e GitHub</h3><p>Projetos no GitHub, portfólio e tutoriais que transformam desafios de npm, Node.js, Git e Windows em conhecimento compartilhado.</p></article>
            <article><span>04</span><small>PRODUTO EM PRODUÇÃO</small><h3>Ronas Desk v1.0</h3><p>19 sprints transformaram interface, API, dados, segurança, testes e infraestrutura em um produto demonstrável.</p></article>
          </div>
        </div>
      </section>

      <section className="section credentials">
        <div className="container"><SectionHead tag="FORMAÇÃO & CERTIFICADOS" title="Conhecimento validado. Prática em movimento." />
          <div className="cert-grid">
            <article className="cert-main reveal"><div className="seal">S<span>✓</span></div><div><span className="cert-tag">CERTIFICADO PRINCIPAL</span><p>SENAI PIAUÍ · 670 HORAS · CONCEITO APTO</p><h3>Programador<br />Full Stack</h3><ul><li>Desenvolvimento Front-End</li><li>Desenvolvimento Back-End</li><li>APIs, dados, testes e Git</li></ul></div><strong className="cert-year">2025</strong></article>
            <div className="cert-side"><article className="reveal"><span>02</span><div><small>FORMAÇÃO COMPLEMENTAR</small><h3>Técnico em Suporte em TI</h3><p>Infraestrutura, manutenção e atendimento ao usuário.</p></div></article><article className="reveal"><span>03</span><div><small>PRODUTIVIDADE</small><h3>Pacote Office Completo</h3><p>Ferramentas para documentação, análise e comunicação.</p></div></article></div>
          </div>
        </div>
      </section>

      <section className="section other-projects">
        <div className="container"><SectionHead tag="OUTROS PROJETOS" title="Aprendizado transformado em entregas." />
          <div className="other-grid">
            <article className="reveal"><span>01 · DEBUGGING</span><h3>Laboratório ERESOLVE npm</h3><p>Conflito real de dependências reproduzido, investigado e documentado passo a passo.</p><div><b>Node.js</b><b>npm</b><b>Documentação</b></div><a href="https://github.com/ronaelmoura/laboratorio-erro-eresolve-npm" target="_blank" rel="noreferrer">Ver código <Arrow /></a></article>
            <article className="reveal"><span>02 · PRODUTO DIGITAL</span><h3>Site institucional</h3><p>Site institucional publicado para apresentar serviços, projetos reais e soluções digitais para negócios.</p><div><b>React</b><b>Vite</b><b>Vercel</b></div><a href="https://www.ronastech.com.br/" target="_blank" rel="noreferrer">Visitar projeto <Arrow /></a></article>
            <article className="reveal"><span>03 · PORTFÓLIO</span><h3>Portfólio Ronas Tech</h3><p>Esta experiência: identidade profissional, performance e narrativa construídas em React.</p><div><b>React</b><b>UX/UI</b><b>SEO</b></div><a href="https://github.com/ronaelmoura/ronaelmoura.github.io" target="_blank" rel="noreferrer">Ver repositório <Arrow /></a></article>
          </div>
        </div>
      </section>

      <section className="contact" id="contato"><div className="container"><div className="contact-card reveal"><p className="eyebrow"><span /> PRÓXIMO DESAFIO</p><h2>Vamos transformar uma ideia em <em>software real?</em></h2><p>Estou aberto a oportunidades como Desenvolvedor Full Stack, colaborações e projetos que gerem impacto.</p><div className="actions"><a className="button light" href="mailto:ronaelmoura240@gmail.com">Enviar um e-mail <Arrow /></a><a className="button outline" href="https://www.linkedin.com/in/ronael-moura" target="_blank" rel="noreferrer">Conectar no LinkedIn <Arrow /></a></div></div></div></section>
    </main>
    <footer><div className="container footer-grid"><a className="brand" href="#inicio"><span>RONAEL <strong>MOURA</strong></span></a><p>Software com foco, pratica e evolucao continua.</p><div><a href="https://github.com/ronaelmoura" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/ronael-moura" target="_blank" rel="noreferrer">LinkedIn</a><a href="#inicio">Topo</a></div><small>{new Date().getFullYear()} Ronael Moura. Todos os direitos reservados.</small></div></footer>
    {recruiterMode && <RecruiterMode onClose={() => setRecruiterMode(false)} />}
  </>
}

export default App
