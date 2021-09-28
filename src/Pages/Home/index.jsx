import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import NavHheader from "../../Components/NavHeader";
import i18n from "../../i18n";
//Importing useTranslation and Trans from react-i18next
import { useTranslation, Trans } from 'react-i18next';
//Setting the use history hook
import { useLocation, useHistory } from 'react-router-dom';

//Importing Firebase 
import firebase from "../../firebase";
import 'firebase/firestore';
import { query, orderBy } from "firebase/firestore";
import 'firebase/auth';


const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' },
    chi: { nativeName: 'Chinese' },
    ar: { nativeName: 'Arabic' }
};

const Home = () => {
    const [currentLanguage, setCurrentLanguage] = useState("");
    const [change, setChange] = useState(true);

    const { t } = useTranslation();

    const history = useHistory();
    // const location = useLocation();
    // const { pathname } = location;

    const changeTheLanguage = (e) => {
        setCurrentLanguage(e);
        i18n.changeLanguage(e);
        if (e === 'de') {
            //`/translations/de/website.json`
            history.push(`/${e}`);
        }
        else if (e === 'en') {
            history.push(`/${e}`);
        }
        else if (e === 'chi') {
            history.push(`/${e}`);
        }
        else if (e === 'ar') {
            history.push(`/${e}`);
        }
    }

    const convertArrayToObject = (array, key) => {
        const initialValue = {};
        return array.reduce((obj, item) => {
            return {
                ...obj,
                [item.translation.description.short_name]: item,
            };
        }, initialValue);
    };

    useEffect(() => {
        //////////////////////////////////////////////////////////////////////////////////////////Retreiving firebase data from web
        // Now retreiving the data
        //////////////////////////////Here all data retreiving is working////////////////////////////
        // const db = firebase.firestore();
        // //Data Retreiving for Auth
        // db.collection(`Languages`)
        //     .get()
        //     .then(snapshot => {
        //         let data = [];
        //         snapshot.forEach(element => {
        //             data.push(Object.assign({
        //                 "id": element.id,
        //                 "translation": element.translation
        //             }, element.data()))
        //         })

        //         const language_array = [];

        //         for (let i = 0; i < data.length; i++) {
        //             //console.log(data[i].translation.description.short_name);
        //             let language_label = data[i].translation.description.short_name;
        //             language_array.push(language_label);
        //         }
        //         console.log(language_array);
        //         console.log(`data for current selected user `, convertArrayToObject(data, 1));
        //     })
        //////////////////////////////////////////////////////////////////////////////////////////Retreiving firebase data from web

        if (change) {
            if (window.location.pathname === `/de`) {
                i18n.changeLanguage("de");
                //                alert("de")
                setChange(false);
            }
            else if (window.location.pathname === `/en` || window.location.pathname === '/') {
                i18n.changeLanguage("en");
                //                alert("en");
                setChange(false);
            }
            else if (window.location.pathname === `/chi`) {
                i18n.changeLanguage("chi");
                //                alert("chi")
                setChange(false);
            }
            else if (window.location.pathname === `/ar`) {
                i18n.changeLanguage("ar");
                //                alert("ar")
                setChange(false);
            }
        }
    })

    const addData = () => {
        // const ref = db.collection(`Data`).doc();
        // const id = ref.id;

        //Resources Object
        const Resources = [
            {
                translation: {
                    description: {
                        short_name: 'en',
                        id: 1,
                        part1: "What this handout is about.This handout will help you understand how paragraphs are formed, how to develop stronger paragraphs, and how to completely and clearly express your ideas.                         What is a paragraph?                        Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the “controlling idea,” because it controls what happens in the rest of the paragraph. How do I decide what to put in a paragraph?                        Before you can begin to determine what the composition of a particular paragraph will be, you must first decide on an argument and a working thesis statement for your paper. What is the most important idea that you are trying to convey to your reader? The information in each paragraph must be related to that idea. In other words, your paragraphs should remind your reader that there is a recurrent relationship between your thesis and the information in each paragraph. A working thesis functions like a seed from which your paper, and your ideas, will grow. The whole process is an organic one—a natural progression from a seed to a full-blown paper where there are direct, familial relationships between all of the ideas in the paper.                                               The decision about what to put into your paragraphs begins with the germination of a seed of ideas; this “germination process” is better known as brainstorming. There are many techniques for brainstorming; whichever one you choose, this stage of paragraph development cannot be skipped. Building paragraphs can be like building a skyscraper: there must be a well-planned foundation that supports what you are building. Any cracks, inconsistencies, or other corruptions of the foundation can cause your whole paper to crumble.                        ",
                        part2: 'Learn React',
                        Nav: 'Internationalization in React',
                        head: 'Welcome to React Translater',
                        url: 'about',
                        home: 'home',
                        subHome: 'This is the Home Page',
                        subAbout: 'This is About Page'
                    }
                }
            },
            {
                translation: {
                    description: {
                        short_name: 'de',
                        id: 2,
                        part1: 'Worum es in diesem Handout geht Dieses Handout hilft Ihnen zu verstehen, wie Absätze gebildet werden, wie Sie stärkere Absätze entwickeln und Ihre Ideen vollständig und klar zum Ausdruck bringen. Was ist ein Absatz? Absätze sind die Bausteine ​​von Papieren. Viele Schüler definieren Absätze in Bezug auf die Länge: Ein Absatz ist eine Gruppe von mindestens fünf Sätzen, ein Absatz ist eine halbe Seite lang usw. In Wirklichkeit ist es jedoch die Einheit und Kohärenz der Ideen zwischen den Sätzen, was einen Absatz ausmacht. Ein Absatz ist definiert als „eine Gruppe von Sätzen oder ein einzelner Satz, der eine Einheit bildet“ (Lunsford und Connors 116). Länge und Aussehen bestimmen nicht, ob ein Abschnitt in einer Arbeit ein Absatz ist. In manchen Schreibstilen, insbesondere im journalistischen Stil, kann ein Absatz beispielsweise nur einen Satz lang sein. Letztendlich ist ein Absatz ein Satz oder eine Gruppe von Sätzen, die eine Hauptidee unterstützen. In diesem Handout werden wir dies als „kontrollierende Idee“ bezeichnen, weil sie steuert, was im Rest des Absatzes passiert. Wie entscheide ich, was in einen Absatz eingefügt werden soll? Bevor Sie mit der Festlegung der Zusammensetzung eines bestimmten Absatzes beginnen können, müssen Sie sich zunächst für ein Argument und eine Arbeitsthese für Ihre Arbeit entscheiden. Was ist die wichtigste Idee, die Sie Ihrem Leser vermitteln möchten? Die Informationen in jedem Absatz müssen sich auf diese Idee beziehen. Mit anderen Worten, Ihre Absätze sollten Ihren Leser daran erinnern, dass es eine wiederkehrende Beziehung zwischen Ihrer These und den Informationen in jedem Absatz gibt. Eine Arbeitsthese funktioniert wie ein Samenkorn, aus dem Ihre Arbeit und Ihre Ideen wachsen. Der gesamte Prozess ist ein organischer – eine natürliche Entwicklung von einem Samenkorn zu einem ausgewachsenen Papier, bei dem es direkte, familiäre Beziehungen zwischen allen Ideen des Papiers gibt. Die Entscheidung, was Sie in Ihre Absätze einfügen möchten, beginnt mit dem Keimen eines Ideensamens; Dieser „Keimungsprozess“ ist besser bekannt als Brainstorming. Es gibt viele Techniken für das Brainstorming; Unabhängig von Ihrer Wahl kann diese Phase der Absatzentwicklung nicht übersprungen werden. Das Erstellen von Absätzen kann wie der Bau eines Wolkenkratzers sein: Es muss ein gut geplantes Fundament geben, das das trägt, was Sie bauen. Jegliche Risse, Inkonsistenzen oder andere Beschädigungen des Fundaments können dazu führen, dass Ihr gesamtes Papier zerbröckelt.',
                        part2: 'Lerne React',
                        Nav: 'Internationalisierung in React',
                        head: 'Willkommen bei React Translater',
                        url: 'Über',
                        home: 'Heimat',
                        subHome: 'Dies ist die Homepage',
                        subAbout: 'Dies ist die Seite'
                    }
                }
            },
            {
                translation: {
                    description: {
                        short_name: 'chi',
                        id: 3,
                        part1: '本讲义是关于什么的。本讲义将帮助您了解段落是如何形成的，如何发展更有力的段落，以及如何完整而清晰地表达您的想法。什么是段落？段落是论文的基石。许多学生根据长度来定义段落：一个段落是一组至少五个句子，一个段落是半页长等。但实际上，句子之间思想的统一性和连贯性才构成了一个段落。段落被定义为“一组句子或形成一个单元的单个句子”（Lunsford and Connors 116）。长度和外观并不能决定论文中的一个部分是否是一个段落。例如，在某些写作风格中，尤其是新闻风格，一个段落可能只有一个句子长。最终，段落是支持一个主要思想的一个句子或一组句子。在本讲义中，我们将其称为“控制思想”，因为它控制着段落其余部分发生的事情。我如何决定在一个段落中放什么？在开始确定特定段落的构成之前，您必须首先确定论文的论点和工作论文陈述。您试图向读者传达的最重要的想法是什么？每个段落中的信息必须与该想法相关。换句话说，你的段落应该提醒你的读者，你的论文和每个段落中的信息之间存在着反复出现的关系。一篇工作论文就像一颗种子，你的论文和想法会从中成长。整个过程是一个有机的过程——从种子到成熟论文的自然过程，论文中的所有想法之间都存在直接的、家族性的关系。关于在段落中放入什么内容的决定始于思想种子的萌芽；这种“萌芽过程”被称为头脑风暴。头脑风暴的技巧有很多；无论你选择哪一个，这个段落发展阶段都不能跳过。建造段落就像建造一座摩天大楼：必须有一个精心规划的基础来支撑你正在建造的东西。基础的任何裂缝、不一致或其他损坏都可能导致整张纸崩溃。',
                        part2: '学习反应',
                        Nav: 'React 中的国际化',
                        head: '欢迎使用 React 翻译器',
                        url: '关于',
                        home: '家',
                        subHome: '这是主页',
                        subAbout: '这是关于页面'
                    }
                }
            },
            {
                translation: {
                    description: {
                        short_name: 'ar',
                        id: 4,
                        part1: 'موضوع هذه النشرة ستساعدك هذه النشرة على فهم كيفية تكوين الفقرات ، وكيفية تطوير فقرات أقوى ، وكيفية التعبير عن أفكارك بشكل كامل وواضح. ما هي الفقرة؟ الفقرات هي اللبنات الأساسية للأوراق. يعرّف العديد من الطلاب الفقرات من حيث الطول: الفقرة هي مجموعة من خمس جمل على الأقل ، والفقرة بطول نصف صفحة ، إلخ. يتم تعريف الفقرة على أنها "مجموعة من الجمل أو جملة واحدة تشكل وحدة" (Lunsford and Connors 116). لا يحدد الطول والمظهر ما إذا كان المقطع في الورقة فقرة أم لا. على سبيل المثال ، في بعض أنماط الكتابة ، وخاصة الأنماط الصحفية ، يمكن أن تكون الفقرة بطول جملة واحدة فقط. في النهاية ، الفقرة هي جملة أو مجموعة من الجمل التي تدعم فكرة رئيسية واحدة. في هذه النشرة ، سوف نشير إلى هذا باسم "الفكرة المسيطرة" ، لأنها تتحكم في ما يحدث في بقية الفقرة. كيف أقرر ما أضعه في فقرة؟ قبل أن تتمكن من البدء في تحديد تكوين فقرة معينة ، يجب عليك أولاً تحديد الحجة وبيان أطروحة العمل لورقتك البحثية. ما هي أهم فكرة تحاول نقلها للقارئ؟ يجب أن تكون المعلومات الواردة في كل فقرة مرتبطة بهذه الفكرة. بمعنى آخر ، يجب أن تذكر فقراتك القارئ بوجود علاقة متكررة بين أطروحتك والمعلومات الواردة في كل فقرة. تعمل أطروحة العمل كبذرة تنمو منها ورقتك وأفكارك. العملية برمتها هي عملية عضوية - تطور طبيعي من بذرة إلى ورقة كاملة حيث توجد علاقات عائلية مباشرة بين جميع الأفكار الواردة في الورقة. يبدأ القرار بشأن ما يجب وضعه في فقراتك بإنبات بذرة من الأفكار ؛ تُعرف "عملية الإنبات" هذه باسم العصف الذهني. هناك العديد من تقنيات العصف الذهني. أيًا كانت المرحلة التي تختارها ، لا يمكن تخطي هذه المرحلة من تطوير الفقرة. يمكن أن يكون بناء الفقرات بمثابة بناء ناطحة سحاب: يجب أن يكون هناك أساس جيد التخطيط يدعم ما تقوم ببنائه. يمكن أن تتسبب أي شقوق أو تناقضات أو فساد آخر في الأساس في انهيار الورق بالكامل.',
                        part2: 'تعلم React',
                        Nav: 'التدويل في React',
                        head: 'مرحبًا بك في React',
                        url: 'حول',
                        home: 'الصفحة الرئيسية',
                        subHome: 'هذه هي الصفحة الرئيسية',
                        subAbout: 'هذا عن الصفحة'
                    }
                }
            }
        ]
        //Resources Object
        alert(`Now sending the data for the languages`);
        const db = firebase.firestore();
        let thingsRef = db.collection(`Languages`);

        // let today = new Date();
        // let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // let dateTime = date + ' ' + time;
        // dateTime = dateTime.toString();

        for (let i = 0; i < Resources.length; i++) {
            thingsRef.add(Resources[i]).then(() => {
                console.log(`Data sent for ${i}`);
            })
        }
    }


    return (
        <>
            <Header />
            <NavHheader />
            <hr />
            <h1 className="text-success container">{t('description.subHome')}</h1>
            <hr />
            <div className="container mt-4 border">
                <div>
                    {Object.keys(lngs).map((lng) => (
                        <button className="btn btn-primary ml-4 mb-2 mt-2" key={lng} style={{ fontWeight: i18n.language === lng ? 'bold' : 'normal' }} type="submit" onClick={() => changeTheLanguage(lng)}>
                            {lngs[lng].nativeName}
                        </button>
                    ))}
                </div>
                <hr />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <p>
                                <Trans i18nKey="description.part1">
                                    Edit <code>src/App.js</code> and save to reload.
                                </Trans>
                            </p>
                            <button
                                className="btn btn-link bg-danger text-light border btn-block"
                            >
                                {t('description.part2')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <button className="btn btn-primary btn-lg" onClick={addData}>Add Data</button> */}

            <br />
        </>
    )
}
export default Home;
