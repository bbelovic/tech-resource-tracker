package org.bbelovic.techresourcetracker;

import org.apache.catalina.LifecycleException;
import org.apache.catalina.valves.rewrite.RewriteValve;

public class LazyRewriteValve extends RewriteValve {
    private final String rule;

    public LazyRewriteValve(String rule) {
        this.rule = rule;
    }

    @Override
    protected synchronized void startInternal() throws LifecycleException {
        super.startInternal();
        parse(rule);
    }
}
