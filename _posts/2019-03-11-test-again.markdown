---
title: test again
date: 2019-03-11 16:30:00 Z
image: "/uploads/earnest-logo.svg"
layout: post
---

<ul>
{% for member in site.data.members %}
<li>
<a href="https://github.com/{{ member.github }}">
{{ member.name }}
</a>
</li>
{% endfor %}
</ul>

<img src="{{post.image}}">

test