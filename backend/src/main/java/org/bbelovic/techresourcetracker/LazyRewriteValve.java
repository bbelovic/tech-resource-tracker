package org.bbelovic.techresourcetracker;

import org.apache.catalina.LifecycleException;
import org.apache.catalina.valves.rewrite.RewriteValve;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.StringReader;

public class LazyRewriteValve extends RewriteValve {
    private static final Logger logger = LoggerFactory.getLogger(LazyRewriteValve.class);
    private final String rule;

    public LazyRewriteValve(String rule) {
        this.rule = rule;
    }

    @Override
    protected synchronized void startInternal() throws LifecycleException {
        super.startInternal();
        var reader = new BufferedReader(new StringReader(rule));
        logger.info("Processing [{}] in valve.", rule);
        parse(reader);
    }
}
