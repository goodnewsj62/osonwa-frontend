

export const newsListAdapter = (item) => {
    const publisher_url = `source/news/${item.publisher}`;
    const detail_url = `aggregate/${item.slug_title}/${item.id}`
    const tagsInfo = { tags: item.tags, tagLink: "/news/tags/" };
    const likeInfo = { count: item.likes, type: "news", likeUrl: `/liked/${item.id}/`, is_liked: item.is_liked };
    const starInfo = { starUrl: `/saved/${item.id}/`, type: "news", saved: item.is_saved };


    return {
        postID: item.id,
        detailUrl: detail_url,
        imgSrc: item.image,
        dpSrc: item.pub_image,
        publisher: item.publisher,
        publisherUrl: publisher_url,
        date: item.date_published,
        title: item.title,
        content: item.content,
        tagsInfo: tagsInfo,
        likeInfo: likeInfo,
        commentInfo: {},
        starInfo: starInfo,
        shareUrl: process.env.REACT_APP_DOMAIN + "/" + detail_url
    }
}


export const articlePostListAdapter = (item) => {
    const publisher = item.is_post ? item.publisher.first_name + " " + item.publisher.last_name : item.publisher
    const publisher_url = item.is_post ? item.publisher.username : `source/article/${item.publisher}`;
    const detail_url = item.is_post ? `article/${item.slug_title}/${item.post_id}` : `aggregate/${item.slug_title}/${item.post_id}`
    const tagsInfo = { tags: item.tags, tagLink: item.is_post ? "/blog/tags/" : "/article/tags/" };
    const likeInfo = { count: item.likes, type: item.is_post ? "post" : "article", likeUrl: `/liked/${item.id}/`, is_liked: item.is_liked };
    const starInfo = { starUrl: `/saved/${item.id}/`, type: item.is_post ? "post" : "article", saved: item.is_saved };


    return {
        postID: item.id,
        detailUrl: detail_url,
        imgSrc: item.image,
        dpSrc: item.pub_image,
        publisher: publisher,
        publisherUrl: publisher_url,
        date: item.date_published,
        title: item.title,
        content: item.content,
        tagsInfo: tagsInfo,
        likeInfo: likeInfo,
        commentInfo: {},
        starInfo: starInfo,
        shareUrl: process.env.REACT_APP_DOMAIN + "/" + detail_url
    }
}